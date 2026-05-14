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
exports.UserquestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userquestion_entity_1 = require("./entities/userquestion.entity");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../../students/entities/student.entity");
const lesson_entity_1 = require("../lesson/entities/lesson.entity");
let UserquestionService = class UserquestionService {
    constructor(questionRepository, lessons, studentsRepo) {
        this.questionRepository = questionRepository;
        this.lessons = lessons;
        this.studentsRepo = studentsRepo;
    }
    async resultExamAssign(lessonId) {
        const questions = await this.questionRepository.find({
            where: { lesson: { id: lessonId } },
            relations: ['lesson'],
        });
        const total = questions.length;
        if (total === 0) {
            return {
                total: 0,
                solvedPercent: 0,
                restPercent: 0,
                truePercent: 0,
                falsePercent: 0,
                choose: {
                    solvedPercent: 0,
                    truePercent: 0,
                    falsePercent: 0,
                },
            };
        }
        const solved = questions.filter(q => q.student_answer !== null && q.student_answer !== '');
        const rest = questions.filter(q => q.student_answer === null || q.student_answer === '');
        const trueQuestions = solved.filter(q => q.trueAnswer === true);
        const falseQuestions = solved.filter(q => q.trueAnswer === false);
        const chooseQuestions = questions.filter(q => q.type_ques === 'chooses');
        const chooseSolved = chooseQuestions.filter(q => q.student_answer !== null && q.student_answer !== '');
        const chooseTrue = chooseSolved.filter(q => q.trueAnswer === true);
        const chooseFalse = chooseSolved.filter(q => q.trueAnswer === false);
        return {
            total: total,
            degree: total === 0
                ? 0
                : Math.round((trueQuestions.length / total) * 100),
            solvedPercent: Math.round((solved.length / total) * 100),
            solved: solved.length,
            restPercent: Math.round((rest.length / total) * 100),
            rest: rest.length,
            truePercent: Math.round((trueQuestions.length / total) * 100),
            trueans: trueQuestions.length,
            falsePercent: Math.round((falseQuestions.length / total) * 100),
            falseans: falseQuestions.length,
            choose: {
                degree: chooseQuestions.length === 0
                    ? 0
                    : Math.round((trueQuestions.length / chooseQuestions.length) * 100),
                solvedPercent: chooseQuestions.length === 0
                    ? 0
                    : Math.round((chooseSolved.length / chooseQuestions.length) * 100),
                truePercent: chooseSolved.length === 0
                    ? 0
                    : Math.round((chooseTrue.length / chooseSolved.length) * 100),
                falsePercent: chooseSolved.length === 0
                    ? 0
                    : Math.round((chooseFalse.length / chooseSolved.length) * 100),
            },
        };
    }
    async answerOfQuestion(id, student_answer) {
        console.log(id);
        console.log(student_answer);
        const rightAnswer = await this.questionRepository.findOne({ where: { id: id,
            } });
        console.log(rightAnswer.id);
        if (rightAnswer.teacher_answer == rightAnswer.student_answer) {
            return await this.questionRepository.update({ id }, { student_answer, trueAnswer: true });
        }
        else {
            return await this.questionRepository.update({ id }, { student_answer, trueAnswer: false });
        }
    }
    async answerOfQuestionexam(id, studentAnswerExam) {
        console.log('Question ID:', id);
        console.log('Student Answer:', studentAnswerExam);
        const rightAnswer = await this.questionRepository.findOne({
            where: { id },
            relations: ['lesson'],
        });
        if (!rightAnswer) {
            console.log(`Question with id ${id} not found`);
            return { error: 'Question not found' };
        }
        const lessonId = rightAnswer.lesson?.id;
        if (!lessonId) {
            console.log(`Lesson not found for question id ${id}`);
            return { percent: 0 };
        }
        const lesson = await this.lessons.findOne({
            where: { id: lessonId },
            relations: ['content', 'questions'],
        });
        if (!lesson)
            return { percent: 0 };
        const hasRequiredContent = lesson.content?.some(c => c.title === 'واجبات و امتحنات');
        if (!hasRequiredContent)
            return { percent: 0 };
        const questions = lesson.questions || [];
        if (!questions.length) {
            lesson.percentageAnswer = 0;
            lesson.questions.map((e) => e.solved = true);
            await this.lessons.save(lesson);
            return { percent: 0 };
        }
        const isCorrect = rightAnswer.teacher_answer === studentAnswerExam;
        await this.questionRepository.update({ id }, {
            studentAnswerExam,
            trueAnswerExam: isCorrect,
            solved: true,
        });
        const solvedCount = questions.filter(q => Number(q.solved) === 1).length;
        const percent = Math.round((solvedCount / questions.length) * 100);
        lesson.percentageAnswer = percent;
        await this.lessons.save(lesson);
        return { percent };
    }
    async questions(lessonId, page = 1, limit = 9) {
        const safePage = Math.max(Number(page) || 1, 1);
        const safeLimit = Math.max(Number(limit) || 9, 1);
        const skip = (safePage - 1) * safeLimit;
        const [questions, total] = await this.questionRepository
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.students', 'student')
            .leftJoinAndSelect('question.lesson', 'lesson')
            .where('lesson.id = :lessonId', { lessonId })
            .skip(skip)
            .take(safeLimit)
            .getManyAndCount();
        if (questions.length === 0) {
            throw new common_1.ForbiddenException("no questions");
        }
        return {
            data: questions,
            currentPage: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        };
    }
    async lessonques(lessonId, page = 1, limit = 9) {
        const safePage = Math.max(Number(page) || 1, 1);
        const safeLimit = Math.max(Number(limit) || 9, 1);
        const skip = (safePage - 1) * safeLimit;
        const [questions, total] = await this.lessons
            .createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.questions', 'questions')
            .where('lesson.id = :lessonId', { lessonId })
            .skip(skip)
            .take(safeLimit)
            .getManyAndCount();
        if (questions.length === 0) {
            throw new common_1.ForbiddenException("no questions");
        }
        return {
            data: questions,
            currentPage: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        };
    }
    async questionsexams(examId, page = 1, limit = 9) {
        const safePage = Math.max(Number(page) || 1, 1);
        const safeLimit = Math.max(Number(limit) || 9, 1);
        const skip = (safePage - 1) * safeLimit;
        const [questions, total] = await this.questionRepository
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.students', 'student')
            .leftJoinAndSelect('question.exam', 'exam')
            .where('exam.id = :examId', { examId })
            .skip(skip)
            .take(safeLimit)
            .getManyAndCount();
        if (questions.length === 0) {
            throw new common_1.ForbiddenException("no questions");
        }
        return {
            data: questions,
            currentPage: safePage,
            limit: safeLimit,
            total,
            totalPages: Math.ceil(total / safeLimit),
        };
    }
    async findAll(page = 1, limit = 9) {
        const skip = (page - 1) * limit;
        const questions = await this.questionRepository.find({ relations: ['students', 'lessons'], where: { students: { id: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) } } });
        questions.map((students) => students.students = students.students?.slice(skip, skip + limit));
        if (questions.length == 0)
            return new common_1.ForbiddenException("no questions");
        return questions;
    }
    findOne(id) {
        return `This action returns a #${id} userquestion`;
    }
    remove(id) {
        return `This action removes a #${id} userquestion`;
    }
    async addAnswer(createanswerDto, id) {
        const question = await this.questionRepository.findOne({
            where: { students: { id: id } },
            relations: ['students']
        });
        if (!question) {
            throw new common_1.NotFoundException('Question not found for this student');
        }
        Object.assign(question, createanswerDto);
        return await this.questionRepository.save(question);
    }
};
exports.UserquestionService = UserquestionService;
exports.UserquestionService = UserquestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userquestion_entity_1.Userquestion)),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(2, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserquestionService);
//# sourceMappingURL=userquestion.service.js.map