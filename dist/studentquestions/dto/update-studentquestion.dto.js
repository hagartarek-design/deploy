"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentquestionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_studentquestion_dto_1 = require("./create-studentquestion.dto");
class UpdateStudentquestionDto extends (0, mapped_types_1.PartialType)(create_studentquestion_dto_1.CreateStudentquestionDto) {
}
exports.UpdateStudentquestionDto = UpdateStudentquestionDto;
//# sourceMappingURL=update-studentquestion.dto.js.map