"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentCourseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_student_course_dto_1 = require("./create-student_course.dto");
class UpdateStudentCourseDto extends (0, mapped_types_1.PartialType)(create_student_course_dto_1.CreateStudentCourseDto) {
}
exports.UpdateStudentCourseDto = UpdateStudentCourseDto;
//# sourceMappingURL=update-student_course.dto.js.map