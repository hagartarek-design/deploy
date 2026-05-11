"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDailytableDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_dailytable_dto_1 = require("./create-dailytable.dto");
class UpdateDailytableDto extends (0, mapped_types_1.PartialType)(create_dailytable_dto_1.CreateDailytableDto) {
}
exports.UpdateDailytableDto = UpdateDailytableDto;
//# sourceMappingURL=update-dailytable.dto.js.map