"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCodeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_code_dto_1 = require("./create-code.dto");
class UpdateCodeDto extends (0, mapped_types_1.PartialType)(create_code_dto_1.CreateCodeDto) {
}
exports.UpdateCodeDto = UpdateCodeDto;
//# sourceMappingURL=update-code.dto.js.map