import "reflect-metadata";
import { DataSource } from "typeorm";
// import { Role } from "./roles/entities/role.entity";
import { Course } from './courses/entities/course.entity';
import { Student } from './students/entities/student.entity';
import { Event } from './teacher/events/entities/event.entity';
import { CourseAttend } from './course_attend/entities/course_attend.entity';
import { Exam } from './teacher/exams/entities/exam.entity';
import { CourseInfo } from './course_info/entities/course_info.entity';
import { CourseReservation } from './course_reservation/entities/course_reservation.entity';
import { User } from './teacher/users/entities/user.entity';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth/auth.guard';
import { Image } from './teacher/images/entities/image.entity';
import { Video } from './videos/entities/video.entity';
import { Section } from './sections/entities/section.entity';
import { Lesson } from './teacher/lesson/entities/lesson.entity';
import { Userquestion } from './teacher/userquestion/entities/userquestion.entity';
import { Assignment } from './assignments/entities/assignment.entity';
import { Dailytable } from './teacher/dailytable/entities/dailytable.entity';
import { StudentCourse } from './student_course/entities/student_course.entity';
import { Content } from './content/entities/content.entity';
import { Pdf } from './pdf/entities/pdf.entity';
import { Attachment } from './attachments/entities/attachment.entity';
import { Code } from './code/entities/code.entity';
import { Enrollment } from './enrollment/entities/enrollment.entity';
import { Material } from './materials/entities/material.entity';
import { Studentquestion } from './studentquestions/entities/studentquestion.entity';
import { Cart } from './cart/entities/cart.entity';

import { Role } from './role/entities/role.entity';
import { Users } from "./users/entities/user.entity";
// import { RolesSeeder } from 'common/Gaurds/script';
// import { Image } from "./teacher/users/entities/image.entity"; 
export const AppDataSource = new DataSource({
      type:'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
port: 3306,
username: process.env.DB_USER || 'root',
password: process.env.DB_PASSWORD || '123456',
database: process.env.DB_NAME || 'teacher_portal2',
    // type: "mysql",
    // host: "localhost",
    // port: 3306,
    // username: "root",     
    // password: "123456",          
    // database: "teacher_portal2",
     entities: [Course,Material,Assignment,Student,Event,CourseAttend,Exam,
          CourseInfo,CourseReservation,User,Image,Video,Section,Lesson,Content,
          Userquestion,Dailytable,StudentCourse,Pdf,Attachment,Code,Enrollment
          ,Studentquestion,Cart,Role,Users],
    migrations: ["src/migrations/*.ts"],
    synchronize: false
});
