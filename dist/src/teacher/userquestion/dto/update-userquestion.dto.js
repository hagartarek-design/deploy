"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserquestionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_userquestion_dto_1 = require("./create-userquestion.dto");
class UpdateUserquestionDto extends (0, mapped_types_1.PartialType)(create_userquestion_dto_1.CreateUserquestionDto) {
}
exports.UpdateUserquestionDto = UpdateUserquestionDto;
//# sourceMappingURL=update-userquestion.dto.js.map