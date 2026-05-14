"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCardimgDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cardimg_dto_1 = require("./create-cardimg.dto");
class UpdateCardimgDto extends (0, mapped_types_1.PartialType)(create_cardimg_dto_1.CreateCardimgDto) {
}
exports.UpdateCardimgDto = UpdateCardimgDto;
//# sourceMappingURL=update-cardimg.dto.js.map