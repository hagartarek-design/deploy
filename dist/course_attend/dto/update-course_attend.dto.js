"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseAttendDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_course_attend_dto_1 = require("./create-course_attend.dto");
class UpdateCourseAttendDto extends (0, mapped_types_1.PartialType)(create_course_attend_dto_1.CreateCourseAttendDto) {
}
exports.UpdateCourseAttendDto = UpdateCourseAttendDto;
//# sourceMappingURL=update-course_attend.dto.js.map