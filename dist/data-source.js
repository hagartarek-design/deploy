"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
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
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'teacher_portal2',
    entities: [course_entity_1.Course, material_entity_1.Material, assignment_entity_1.Assignment, student_entity_1.Student, event_entity_1.Event, course_attend_entity_1.CourseAttend, exam_entity_1.Exam,
        course_info_entity_1.CourseInfo, course_reservation_entity_1.CourseReservation, user_entity_1.User, image_entity_1.Image, video_entity_1.Video, section_entity_1.Section, lesson_entity_1.Lesson, content_entity_1.Content,
        userquestion_entity_1.Userquestion, dailytable_entity_1.Dailytable, student_course_entity_1.StudentCourse, pdf_entity_1.Pdf, attachment_entity_1.Attachment, code_entity_1.Code, enrollment_entity_1.Enrollment,
        studentquestion_entity_1.Studentquestion, cart_entity_1.Cart, role_entity_1.Role, user_entity_2.Users],
    migrations: ["src/migrations/*.ts"],
    synchronize: false
});
//# sourceMappingURL=data-source.js.map