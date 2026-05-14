"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseInfoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_course_info_dto_1 = require("./create-course_info.dto");
class UpdateCourseInfoDto extends (0, mapped_types_1.PartialType)(create_course_info_dto_1.CreateCourseInfoDto) {
}
exports.UpdateCourseInfoDto = UpdateCourseInfoDto;
//# sourceMappingURL=update-course_info.dto.js.map