"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const course_entity_1 = require("./entities/course.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const student_entity_1 = require("../students/entities/student.entity");
const course_attend_entity_1 = require("../course_attend/entities/course_attend.entity");
const section_entity_1 = require("../sections/entities/section.entity");
const course_info_entity_1 = require("../course_info/entities/course_info.entity");
const lesson_entity_1 = require("../teacher/lesson/entities/lesson.entity");
const fs = require("fs");
const pdf_lib_1 = require("pdf-lib");
const path = require("path");
const pdfParse = require("pdf-parse");
const cart_entity_1 = require("../cart/entities/cart.entity");
let CoursesService = class CoursesService {
    constructor(Repository, course_attend, Repository2, courseinfo, section, cartRepo, lesson) {
        this.Repository = Repository;
        this.course_attend = course_attend;
        this.Repository2 = Repository2;
        this.courseinfo = courseinfo;
        this.section = section;
        this.cartRepo = cartRepo;
        this.lesson = lesson;
    }
    async getallCourses(id) {
        const course = await this.Repository.find({ where: { student_id: { id } } });
        if (!course)
            return new common_1.NotFoundException("course not found");
        return { success: true, course: course };
    }
    async getbysectionid(id, section_id) {
        const course = await this.courseinfo.find({
            relations: ['section.course', 'section.lesson'],
            where: {
                students: { id },
                section: { id: section_id },
            },
        });
        if (!course || course.length === 0)
            throw new common_1.ConflictException('Section not found');
        const allLessons = course.flatMap(course => course.section?.flatMap(sec => sec.lesson || []) || []);
        const totalLessons = allLessons.length;
        const completedLessons = allLessons.filter(lesson => lesson.isUsed).length;
        const percent = (completedLessons / totalLessons) * 100;
        return {
            success: true,
            course,
            percent: percent,
            completedLessons,
            totalLessons,
        };
    }
    async getsectionid(id, lesson_id) {
        const course = await this.courseinfo.find({ relations: ['section.lesson'], where: {
                students: { id },
                section: { lesson: { id: lesson_id } }
            } });
        if (!course)
            return new common_1.ConflictException('section not found');
        return { success: true, course };
    }
    async getlessonid(id, section_id) {
        const course = await this.courseinfo.find({ relations: ['section.course'], where: {
                students: { id },
                section: { id: section_id }
            } });
        if (!course)
            return new common_1.ConflictException('section not found');
        return { success: true, course };
    }
    async saveVideo(file) {
        const video = this.Repository.create({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            path: file.path,
        });
        return this.Repository.save(video);
    }
    async saveVideoLesson(file) {
        const lesson = await this.lesson.create({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            path: file.path
        });
        await this.lesson.save(lesson);
        return { lesson };
    }
    async getVideo(id) {
        return await this.Repository.findOneBy({ id });
    }
    async updatePdf(id, file) {
        const pdf = await this.lesson.findOne({ where: { id } });
        if (!pdf)
            throw new common_1.NotFoundException("pdf not found");
        pdf.name = file.originalname;
        pdf.filePath = `uploads/${file.filename}`;
        pdf.fileData = file.buffer;
        return this.lesson.save(pdf);
    }
    async trackVideoProgress(lessonId, contentId, dto) {
        const lesson = await this.lesson.findOne({
            where: { id: lessonId },
        });
        if (!lesson)
            return;
        if (!lesson.videoProgress)
            lesson.videoProgress = {};
        const percentage = Math.min(100, (dto.currentTime / dto.duration) * 100);
        lesson.videoProgress[contentId] = {
            isCompleted: percentage >= 95,
            lastPosition: dto.currentTime,
            totalDuration: dto.duration,
            percentage: percentage,
            lastUpdated: new Date(),
        };
        await this.lesson.save(lesson);
        await this.updateSectionPercent(lesson.section.id);
        return { percentage };
    }
    async updateSectionPercent(sectionId) {
        const section = await this.section.findOne({
            where: { id: sectionId },
            relations: ['lesson', 'lesson.content'],
        });
        if (!section)
            return;
        const lectureLessons = section.lesson.filter(lesson => lesson.content?.some(c => c.title === 'المحاضرات'));
        let totalDuration = 0;
        let watchedDuration = 0;
        for (const lesson of lectureLessons) {
            for (const c of lesson.content) {
                if (c.title !== 'المحاضرات')
                    continue;
                const progress = lesson.videoProgress?.[c.id];
                if (!progress)
                    continue;
                totalDuration += c.duration ?? 0;
                watchedDuration += Math.min(progress.lastPosition, c.duration ?? 0);
            }
        }
        const percent = totalDuration === 0 ? 0 : Number(((watchedDuration / totalDuration) * 100).toFixed(2));
        section.percent = percent;
        await this.section.save(section);
        return { percent };
    }
    async findByIdlesson(Lesson_id) {
        return await this.lesson.findOne({
            where: {
                id: Lesson_id,
            },
        });
    }
    async findById(id) {
        return await this.Repository.findOne({ where: { id } });
    }
    async withpaginating(offset, limit) {
        try {
            return await this.Repository.find({
                skip: offset, take: limit, select: { course_attend: true, students: true, }, relations: ['students', 'course_attend']
            });
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async allcourses() {
        try {
            return await this.Repository.find({ select: { course_attend: true, students: true, }, relations: ['students', 'course_attend'] });
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async findOne(name, grade) {
        if (!name || !grade) {
            throw new Error('Invalid parameters: name and grade are required');
        }
        const courses = await this.Repository.findOne({
            where: { name, grade },
            relations: [
                'students',
                'course_attend',
                'course_info.students',
                'course_info.course',
            ],
        });
        if (!courses) {
            throw new common_1.NotFoundException('Course not found');
        }
        return courses;
    }
    async getpagination(offset, limit) {
        return await this.Repository.find({ skip: offset, take: limit, });
    }
    async findmonth_by_year(month_by_year) {
        const course = await this.Repository.findOne({
            where: { month_by_year: month_by_year }, relations: ['course_attend']
        });
        return course;
    }
    async bytypetoday(type) {
        const types = await this.Repository.findOne({
            where: { type: type }, relations: ['course_attend']
        });
        return types;
    }
    async findtype(type) {
        const courses = await this.Repository.findOne({
            where: {
                type: type
            },
            relations: ['course_attend'],
        });
        return courses;
    }
    update(id, updateCourseDto) {
        return `This action updates a #${id} course`;
    }
    async createPDF(file) {
        const pdfBuffer = fs.readFileSync(file.path);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPageCount();
        const pdf = this.lesson.create({
            filename: file.filename,
            originalName: file.originalname,
            filePath: file.path,
            pageCount,
            pageOrder: JSON.stringify(Array.from({ length: pageCount }, (_, i) => i)),
        });
        return this.lesson.save(pdf);
    }
    async getPDF(id) {
        const pdf = await this.lesson.findOne({ where: { id } });
        if (!pdf) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return pdf;
    }
    async getAllPDFs() {
        return this.lesson.find();
    }
    async reorderPages(id, newOrder) {
        const pdf = await this.getPDF(id);
        if (newOrder.length !== pdf.pageCount) {
            throw new Error('Invalid page order length');
        }
        const pdfBuffer = fs.readFileSync(pdf.filePath);
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBuffer);
        const reorderedDoc = await pdf_lib_1.PDFDocument.create();
        const copiedPages = await reorderedDoc.copyPages(pdfDoc, newOrder);
        copiedPages.forEach(page => reorderedDoc.addPage(page));
        const modifiedPdfBuffer = await reorderedDoc.save();
        const newFilename = `reordered-${Date.now()}.pdf`;
        const newFilePath = path.join(path.dirname(pdf.filePath), newFilename);
        fs.writeFileSync(newFilePath, modifiedPdfBuffer);
        pdf.filePath = newFilePath;
        pdf.filename = newFilename;
        pdf.pageOrder = JSON.stringify(newOrder);
        return this.lesson.save(pdf);
    }
    async deletePDF(id) {
        const pdf = await this.getPDF(id);
        if (fs.existsSync(pdf.filePath)) {
            fs.unlinkSync(pdf.filePath);
        }
        await this.lesson.delete(id);
    }
    remove(id) {
        return `This action removes a #${id} course`;
    }
    async findcoursehasstudents() {
        return await this.Repository.find({});
    }
    async findAll(page = 1, limit = 9, id) {
        page = Number(page) || 1;
        limit = Number(limit) || 9;
        const skip = (page - 1) * limit;
        const course = await this.Repository.findOne({ relations: ['student', 'student_id'], where: { id: id } });
        course.student?.slice(skip, skip + limit);
        if (!course) {
            return new common_1.ForbiddenException("No course found");
        }
        return course;
    }
    async getcourseNumStudent(id, page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const course = await this.Repository.find({ relations: ['student_id', 'student'], where: { id: id } });
        if (!course)
            return new common_1.NotFoundException("");
        if (course.map((e) => e.student).length == 0)
            return new common_1.NotFoundException("no students found");
        course.forEach((e) => {
            if (Array.isArray(e.student)) {
                e.student = e.student.slice(skip, skip + limit);
            }
        });
        return course;
    }
    async getonecourseStudent(id, page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const course = await this.Repository.findOne({
            relations: ['student_id', 'student'],
            where: { id },
        });
        if (!course)
            return new common_1.NotFoundException('Course not found');
        if (!Array.isArray(course.student)) {
            course.student = [];
        }
        else {
            course.student = course.student.slice(skip, skip + limit);
        }
        return course;
    }
    async findbyId(id, userId, page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const course = await this.Repository.findOne({
            where: { id: id }, relations: ['student']
        });
        if (!course)
            return new common_1.ForbiddenException("there is no course");
        if (isNaN(id))
            return new common_1.BadRequestException("nanid");
        if (course) {
            course.student = course.student?.slice(skip, skip + limit);
            return course;
        }
    }
    async getCourseWithStudents(id, userId, page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        if (isNaN(id)) {
            return new common_1.BadRequestException("Invalid ID");
        }
        const course = await this.Repository.findOne({
            where: { id },
            relations: ['student_id', 'student']
        });
        if (!course) {
            return new common_1.NotFoundException("Course not found");
        }
        if (course.student) {
            course.student = course.student.slice(skip, skip + limit);
        }
        return course;
    }
    async findmany() {
        return await this.Repository.find({});
    }
    async findbytype() {
        return await this.Repository.find({ relations: [''] });
    }
    async findby(name, phoneNum, email, id) {
        return await this.Repository.find({
            where: { student: { name: name, phoneNum: phoneNum, email: email }, id
            },
            relations: ['student']
        });
    }
    async byCenterName2(id) {
        return await this.Repository.find({ where: { id: id }, relations: ['student_id', 'student', 'students'] });
    }
    async savePdf(file) {
        const dataBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(dataBuffer);
        const pdf = this.lesson.create({
            filename2: file.filename,
            originalName2: file.originalname,
            mimeTypes: file.mimetype,
            filePath: file.path,
            totalPages: pdfData.numpages,
        });
        return await this.lesson.save(pdf);
    }
    async getPdfInfo(pdfId) {
        return await this.lesson.findOne({ where: { id: pdfId } });
    }
    extractPageMetadata(pdfData) {
        const metadata = [];
        for (let i = 0; i < pdfData.numpages; i++) {
            metadata.push({
                pageNumber: i + 1,
                hasText: pdfData.text.length > 0,
            });
        }
        return metadata;
    }
    async getPdfById(id) {
        const pdf = await this.lesson.findOne({ where: { id } });
        if (!pdf) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        return pdf;
    }
    async getAllPdfs() {
        return await this.lesson.find({
            order: { createdAt: 'DESC' },
        });
    }
    async deletePdf(id) {
        const pdf = await this.getPdfById(id);
        if (fs.existsSync(pdf.filePath)) {
            fs.unlinkSync(pdf.filePath);
        }
        await this.lesson.delete(id);
    }
    generateCode() {
        return (0, crypto_1.randomBytes)(6).toString('hex').toUpperCase();
    }
    async payWithCode(id, code, courseId) {
        const courseCode = await this.Repository.findOne({
            where: {
                student_id: { id },
                code,
                id: courseId
            },
            relations: ['student_id']
        });
        if (!courseCode) {
            throw new common_1.NotFoundException('wrong code');
        }
        if (courseCode.isUsed) {
            throw new common_1.BadRequestException('course already purchased');
        }
        const coursePrice = await this.getCoursePrice(courseId);
        const student = courseCode.student_id;
        if (student.walletBalance < coursePrice) {
            throw new common_1.BadRequestException('not enoughh balance');
        }
        student.walletBalance -= coursePrice;
        await this.Repository2.save(student);
        await this.Repository2.save({
            id: id,
            courseId: courseId,
            purchaseDate: new Date(),
            amountPaid: coursePrice
        });
        courseCode.isUsed = true;
        await this.Repository.save(courseCode);
        return {
            message: 'your payment success',
            courseId: courseId,
            remainingBalance: student.balance,
            amountPaid: coursePrice
        };
    }
    async getCoursePrice(courseId) {
        const course = await this.Repository.findOne({
            where: { id: courseId },
            select: ['price']
        });
        if (!course) {
            throw new common_1.NotFoundException('الكورس غير موجود');
        }
        return course.price;
    }
    async generatesCode(id) {
        const code = (0, crypto_1.randomBytes)(4).toString('hex').toUpperCase();
        const newCode = this.Repository.update({ id, }, {
            code,
            isUsed: false
        });
        return await newCode;
    }
    async generateCard(id) {
        const code = (0, crypto_1.randomBytes)(6).toString('hex').toUpperCase();
        const card = await this.Repository.findOne({
            where: { id }
        });
        await this.Repository.update({ id }, { code: code,
            amount: 10,
            isUsed: false, });
        return {
            message: 'Recharge card updated successfully',
            code: card.code,
            amount: card.amount,
        };
    }
    async addToCart(userId, courseId) {
        const user = await this.Repository2.findOne({
            where: { id: userId },
            relations: ['courses'],
        });
        if (!user)
            throw new common_1.ConflictException('User does not exist');
        const course = await this.Repository.findOne({
            where: { id: courseId },
        });
        if (!course)
            throw new common_1.ConflictException('course does not exist');
        const alreadyOwned = user.courses.some(a => a.id === courseId);
        if (alreadyOwned) {
            throw new common_1.ConflictException('User already owns this course');
        }
        const existingCartItem = await this.cartRepo.findOne({
            where: {
                student: { id: userId },
                course: { id: courseId },
            },
            relations: ['course'],
        });
        if (existingCartItem) {
            throw new common_1.ConflictException('Item already in cart');
        }
        const newCartItem = this.cartRepo.create({
            student: user,
            course: course,
        });
        const savedItem = await this.cartRepo.save(newCartItem);
        return {
            success: true,
            message: 'course added to cart successfully',
            cartItem: {
                course: {
                    id: savedItem.course.id,
                    price: savedItem.course.price,
                },
            },
        };
    }
    async useRechargeCard(dto, userId) {
        const card = await this.Repository2.findOne({ where: { code: dto.code } });
        if (!card)
            throw new common_1.BadRequestException('wrong card');
        if (card.isUsed)
            throw new common_1.BadRequestException('card already used');
        const user = await this.Repository2.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('user not found');
        user.walletBalance += card.walletBalance;
        await this.Repository2.save(user);
        card.isUsed = true;
        await this.Repository2.save(card);
        return {
            message: 'wallet charged successfully',
            balance: user.walletBalance,
        };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_2.InjectRepository)(course_attend_entity_1.CourseAttend)),
    __param(2, (0, typeorm_2.InjectRepository)(student_entity_1.Student)),
    __param(3, (0, typeorm_2.InjectRepository)(course_info_entity_1.CourseInfo)),
    __param(4, (0, typeorm_2.InjectRepository)(section_entity_1.Section)),
    __param(5, (0, typeorm_2.InjectRepository)(cart_entity_1.Cart)),
    __param(6, (0, typeorm_2.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map