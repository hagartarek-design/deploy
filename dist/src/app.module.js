"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const courses_module_1 = require("./courses/courses.module");
const academic_year_module_1 = require("./academic_year/academic_year.module");
const students_module_1 = require("./students/students.module");
const student_course_module_1 = require("./student_course/student_course.module");
const events_module_1 = require("./teacher/events/events.module");
const course_attend_module_1 = require("./course_attend/course_attend.module");
const exams_module_1 = require("./teacher/exams/exams.module");
const course_info_module_1 = require("./course_info/course_info.module");
const course_reservation_module_1 = require("./course_reservation/course_reservation.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./teacher/users/users.module");
const images_module_1 = require("./teacher/images/images.module");
const videos_module_1 = require("./videos/videos.module");
const sections_module_1 = require("./sections/sections.module");
const cardimg_module_1 = require("./cardimg/cardimg.module");
const userquestion_module_1 = require("./teacher/userquestion/userquestion.module");
const lesson_module_1 = require("./teacher/lesson/lesson.module");
const questionstudents_module_1 = require("./teacher/questionstudents/questionstudents.module");
const firebase_admin_1 = require("./auth/entities/firebase-admin");
const assignments_module_1 = require("./assignments/assignments.module");
const dailytable_module_1 = require("./teacher/dailytable/dailytable.module");
const content_module_1 = require("./content/content.module");
const pdf_module_1 = require("./pdf/pdf.module");
const attachments_module_1 = require("./attachments/attachments.module");
const code_module_1 = require("./code/code.module");
const enrollment_module_1 = require("./enrollment/enrollment.module");
const materials_module_1 = require("./materials/materials.module");
const studentquestions_module_1 = require("./studentquestions/studentquestions.module");
const cart_module_1 = require("./cart/cart.module");
const role_module_1 = require("./role/role.module");
const users_module_2 = require("./users/users.module");
const course_entity_1 = require("./courses/entities/course.entity");
const student_entity_1 = require("./students/entities/student.entity");
const event_entity_1 = require("./teacher/events/entities/event.entity");
const course_attend_entity_1 = require("./course_attend/entities/course_attend.entity");
const exam_entity_1 = require("./teacher/exams/entities/exam.entity");
const course_info_entity_1 = require("./course_info/entities/course_info.entity");
const course_reservation_entity_1 = require("./course_reservation/entities/course_reservation.entity");
const user_entity_1 = require("./teacher/users/entities/user.entity");
const image_entity_1 = require("./teacher/images/entities/image.entity");
const video_entity_1 = require("./videos/entities/video.entity");
const section_entity_1 = require("./sections/entities/section.entity");
const lesson_entity_1 = require("./teacher/lesson/entities/lesson.entity");
const userquestion_entity_1 = require("./teacher/userquestion/entities/userquestion.entity");
const assignment_entity_1 = require("./assignments/entities/assignment.entity");
const dailytable_entity_1 = require("./teacher/dailytable/entities/dailytable.entity");
const student_course_entity_1 = require("./student_course/entities/student_course.entity");
const content_entity_1 = require("./content/entities/content.entity");
const pdf_entity_1 = require("./pdf/entities/pdf.entity");
const attachment_entity_1 = require("./attachments/entities/attachment.entity");
const code_entity_1 = require("./code/entities/code.entity");
const enrollment_entity_1 = require("./enrollment/entities/enrollment.entity");
const material_entity_1 = require("./materials/entities/material.entity");
const studentquestion_entity_1 = require("./studentquestions/entities/studentquestion.entity");
const cart_entity_1 = require("./cart/entities/cart.entity");
const role_entity_1 = require("./role/entities/role.entity");
const user_entity_2 = require("./users/entities/user.entity");
const dynamicrolegaurd_1 = require("../common/Gaurds/dynamicrolegaurd");
const mockdynamicroles_1 = require("../common/Gaurds/mockdynamicroles");
const script_1 = require("../common/Gaurds/script");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            firebase_admin_1.FirebaseAdminModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [
                    course_entity_1.Course,
                    material_entity_1.Material,
                    assignment_entity_1.Assignment,
                    student_entity_1.Student,
                    event_entity_1.Event,
                    course_attend_entity_1.CourseAttend,
                    exam_entity_1.Exam,
                    course_info_entity_1.CourseInfo,
                    course_reservation_entity_1.CourseReservation,
                    user_entity_1.User,
                    image_entity_1.Image,
                    video_entity_1.Video,
                    section_entity_1.Section,
                    lesson_entity_1.Lesson,
                    content_entity_1.Content,
                    userquestion_entity_1.Userquestion,
                    dailytable_entity_1.Dailytable,
                    student_course_entity_1.StudentCourse,
                    pdf_entity_1.Pdf,
                    attachment_entity_1.Attachment,
                    code_entity_1.Code,
                    enrollment_entity_1.Enrollment,
                    studentquestion_entity_1.Studentquestion,
                    cart_entity_1.Cart,
                    role_entity_1.Role,
                    user_entity_2.Users,
                ],
                synchronize: false,
                retryAttempts: 10,
                retryDelay: 5000,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Role, user_entity_2.Users]),
            courses_module_1.CoursesModule,
            academic_year_module_1.AcademicYearModule,
            students_module_1.StudentsModule,
            student_course_module_1.StudentCourseModule,
            events_module_1.EventsModule,
            course_attend_module_1.CourseAttendModule,
            exams_module_1.ExamsModule,
            course_info_module_1.CourseInfoModule,
            course_reservation_module_1.CourseReservationModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            users_module_2.UsersModules,
            images_module_1.ImagesModule,
            videos_module_1.VideosModule,
            sections_module_1.SectionsModule,
            cardimg_module_1.CardimgModule,
            userquestion_module_1.UserquestionModule,
            lesson_module_1.LessonModule,
            questionstudents_module_1.QuestionstudentsModule,
            assignments_module_1.AssignmentsModule,
            dailytable_module_1.DailytableModule,
            content_module_1.ContentModule,
            pdf_module_1.PdfModule,
            attachments_module_1.AttachmentsModule,
            code_module_1.CodeModule,
            enrollment_module_1.EnrollmentModule,
            materials_module_1.MaterialsModule,
            studentquestions_module_1.StudentquestionsModule,
            cart_module_1.CartModule,
            role_module_1.RoleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            dynamicrolegaurd_1.DynamicRoleGuard,
            mockdynamicroles_1.JwtAuthGuard,
            core_1.Reflector,
            script_1.RolesSeeder,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map