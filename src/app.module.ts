// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { CoursesModule } from './courses/courses.module';
// import { AcademicYearModule } from './academic_year/academic_year.module';
// import { StudentsModule } from './students/students.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Course } from './courses/entities/course.entity';
// import { Student } from './students/entities/student.entity';
// import { StudentCourseModule } from './student_course/student_course.module';
// import { EventsModule } from './teacher/events/events.module';
// import { Event } from './teacher/events/entities/event.entity';
// import { CourseAttendModule } from './course_attend/course_attend.module';
// import { CourseAttend } from './course_attend/entities/course_attend.entity';
// import { ExamsModule } from './teacher/exams/exams.module'; 
// import { Exam } from './teacher/exams/entities/exam.entity';
// import { CourseInfoModule } from './course_info/course_info.module';
// import { CourseInfo } from './course_info/entities/course_info.entity';
// import { CourseReservationModule } from './course_reservation/course_reservation.module';
// import { CourseReservation } from './course_reservation/entities/course_reservation.entity';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './teacher/users/users.module';
// import { User } from './teacher/users/entities/user.entity';
// // import { APP_GUARD } from '@nestjs/core';
// // import { AuthGuard } from './auth/auth.guard';
// import { ImagesModule } from './teacher/images/images.module';
// import { Image } from './teacher/images/entities/image.entity';
// import { VideosModule } from './videos/videos.module';
// import { Video } from './videos/entities/video.entity';
// import { SectionsModule } from './sections/sections.module';
// import { Section } from './sections/entities/section.entity';
// import { CardimgModule } from './cardimg/cardimg.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserquestionModule } from './teacher/userquestion/userquestion.module';
// import { LessonModule } from './teacher/lesson/lesson.module';
// import { Lesson } from './teacher/lesson/entities/lesson.entity';
// import { Userquestion } from './teacher/userquestion/entities/userquestion.entity';
// import { QuestionstudentsModule } from './teacher/questionstudents/questionstudents.module';
// import { FirebaseAdminModule } from './auth/entities/firebase-admin'; 
// import { AssignmentsModule } from './assignments/assignments.module';
// import { Assignment } from './assignments/entities/assignment.entity';
// import { DailytableModule } from './teacher/dailytable/dailytable.module';
// import { Dailytable } from './teacher/dailytable/entities/dailytable.entity';
// import { StudentCourse } from './student_course/entities/student_course.entity';
// import { ContentModule } from './content/content.module';
// import { Content } from './content/entities/content.entity';
// // import { PdfImageModule } from './pdf-image/pdf-image.module';
// import { PdfModule } from './pdf/pdf.module';
// import { Pdf } from './pdf/entities/pdf.entity';
// import { AttachmentsModule } from './attachments/attachments.module';
// import { Attachment } from './attachments/entities/attachment.entity';
// import { CodeModule } from './code/code.module';
// import { Code } from './code/entities/code.entity';
// import { EnrollmentModule } from './enrollment/enrollment.module';
// import { Enrollment } from './enrollment/entities/enrollment.entity';
// import { MaterialsModule } from './materials/materials.module';
// import { Material } from './materials/entities/material.entity';
// import { StudentquestionsModule } from './studentquestions/studentquestions.module';
// import { Studentquestion } from './studentquestions/entities/studentquestion.entity';
// import { CartModule } from './cart/cart.module';
// import { Cart } from './cart/entities/cart.entity';
// import { RoleModule } from './role/role.module';
// import { Role } from './role/entities/role.entity';
// import { DynamicRoleGuard } from 'common/Gaurds/dynamicrolegaurd';
// import { JwtAuthGuard } from 'common/Gaurds/mockdynamicroles';
// import { Reflector } from '@nestjs/core';
// import { RolesSeeder } from 'common/Gaurds/script';
// import { UsersModules } from './users/users.module';
// import { Users } from './users/entities/user.entity'; 


// @Module({
  
//   imports: [
    


//     FirebaseAdminModule ,
//     ConfigModule.forRoot(),
// //     TypeOrmModule.forRootAsync({
// //       useFactory: () => ({
// //         type:'mysql',host: 'mysql_db',
// //         // host: process.env.DB_HOST || '127.0.0.1',
// // port: 3306,
// // username: process.env.DB_USER || 'root',
// // password: process.env.DB_PASSWORD || '123456',
// // database: process.env.DB_NAME || 'teacher_portal2',
// TypeOrmModule.forRoot({
//   type: 'mysql',

//   host: 'mysql_db',

//   port: 3306,

//   username: 'nestuser',

//   password: 'nestpass',

//   database: 'teacher_portal2',

//   autoLoadEntities: true,


//         // host:'127.0.0.1',
//         // // port:3306,
//         // username:'root',
//         // password:'123456',
//         // database:'teacher_portal2',
//         entities: [Course,Material,Assignment,Student,Event,CourseAttend,Exam,
//           CourseInfo,CourseReservation,User,Image,Video,Section,Lesson,Content,
//           Userquestion,Dailytable,StudentCourse,Pdf,Attachment,Code,Enrollment
//           ,Studentquestion,Cart,Role,Users],
//         synchronize: false, 
//     }),//]
//       imports: [ConfigModule],
//       inject: [ConfigService],
//     // }),
//     TypeOrmModule.forFeature([User,Role,Users]),





   
//     CoursesModule, AcademicYearModule, StudentsModule, StudentCourseModule, EventsModule, CourseAttendModule, ExamsModule, CourseInfoModule, CourseReservationModule, AuthModule,UsersModule, UsersModules, ImagesModule, VideosModule, SectionsModule, CardimgModule, UserquestionModule, LessonModule, QuestionstudentsModule, AssignmentsModule, DailytableModule, ContentModule, PdfModule, AttachmentsModule, CodeModule, EnrollmentModule, MaterialsModule, StudentquestionsModule, CartModule, RoleModule,// PdfImageModule



//   ],
//   controllers: [AppController],
//   providers: [AppService,DynamicRoleGuard, JwtAuthGuard, Reflector,RolesSeeder],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CoursesModule } from './courses/courses.module';
import { AcademicYearModule } from './academic_year/academic_year.module';
import { StudentsModule } from './students/students.module';
import { StudentCourseModule } from './student_course/student_course.module';
import { EventsModule } from './teacher/events/events.module';
import { CourseAttendModule } from './course_attend/course_attend.module';
import { ExamsModule } from './teacher/exams/exams.module';
import { CourseInfoModule } from './course_info/course_info.module';
import { CourseReservationModule } from './course_reservation/course_reservation.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './teacher/users/users.module';
import { ImagesModule } from './teacher/images/images.module';
import { VideosModule } from './videos/videos.module';
import { SectionsModule } from './sections/sections.module';
import { CardimgModule } from './cardimg/cardimg.module';
import { UserquestionModule } from './teacher/userquestion/userquestion.module';
import { LessonModule } from './teacher/lesson/lesson.module';
import { QuestionstudentsModule } from './teacher/questionstudents/questionstudents.module';
import { FirebaseAdminModule } from './auth/entities/firebase-admin';
import { AssignmentsModule } from './assignments/assignments.module';
import { DailytableModule } from './teacher/dailytable/dailytable.module';
import { ContentModule } from './content/content.module';
import { PdfModule } from './pdf/pdf.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { CodeModule } from './code/code.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { MaterialsModule } from './materials/materials.module';
import { StudentquestionsModule } from './studentquestions/studentquestions.module';
import { CartModule } from './cart/cart.module';
import { RoleModule } from './role/role.module';
import { UsersModules } from './users/users.module';

import { Course } from './courses/entities/course.entity';
import { Student } from './students/entities/student.entity';
import { Event } from './teacher/events/entities/event.entity';
import { CourseAttend } from './course_attend/entities/course_attend.entity';
import { Exam } from './teacher/exams/entities/exam.entity';
import { CourseInfo } from './course_info/entities/course_info.entity';
import { CourseReservation } from './course_reservation/entities/course_reservation.entity';
import { User } from './teacher/users/entities/user.entity';
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
import { Users } from './users/entities/user.entity';

import { DynamicRoleGuard } from 'common/Gaurds/dynamicrolegaurd';
import { JwtAuthGuard } from 'common/Gaurds/mockdynamicroles';
import { RolesSeeder } from 'common/Gaurds/script';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    FirebaseAdminModule,

TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,

  // autoLoadEntities: true,
  synchronize: false,

  // retryAttempts: 10,
  // retryDelay: 5000,

  // type: 'mysql',

  // host: 'mysql_db',

  // port: 3306,

  // username: 'root',

  // password: 'root',

  // database: 'teacher_portal2',

  // autoLoadEntities: true,
  
    // autoLoadEntities: true,
    // synchronize: true,

  entities: [
    Course,
    Material,
    Assignment,
    Student,
    Event,
    CourseAttend,
    Exam,
    CourseInfo,
    CourseReservation,
    User,
    Image,
    Video,
    Section,
    Lesson,
    Content,
    Userquestion,
    Dailytable,
    StudentCourse,
    Pdf,
    Attachment,
    Code,
    Enrollment,
    Studentquestion,
    Cart,
    Role,
    Users,
  ],

  retryAttempts: 10,
  retryDelay: 5000,


}),
    TypeOrmModule.forFeature([Course,
    Material,
    Assignment,
    Student,
    Event,
    CourseAttend,
    Exam,
    CourseInfo,
    CourseReservation,
   
    Image,
    Video,
    Section,
    Lesson,
    Content,
    Userquestion,
    Dailytable,
    StudentCourse,
    Pdf,
    Attachment,
    Code,
    Enrollment,
    Studentquestion,
    Cart,
    Role,
    Users,User]),

    CoursesModule,
    AcademicYearModule,
    StudentsModule,
    StudentCourseModule,
    EventsModule,
    CourseAttendModule,
    ExamsModule,
    CourseInfoModule,
    CourseReservationModule,
    AuthModule,
    UsersModule,
    UsersModules,
    ImagesModule,
    VideosModule,
    SectionsModule,
    CardimgModule,
    UserquestionModule,
    LessonModule,
    QuestionstudentsModule,
    AssignmentsModule,
    DailytableModule,
    ContentModule,
    PdfModule,
    AttachmentsModule,
    CodeModule,
    EnrollmentModule,
    MaterialsModule,
    StudentquestionsModule,
    CartModule,
    RoleModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    DynamicRoleGuard,
    JwtAuthGuard,
    Reflector,
    RolesSeeder,
  ],
})
export class AppModule {}
