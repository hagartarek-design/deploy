"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseReservationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_course_reservation_dto_1 = require("./create-course_reservation.dto");
class UpdateCourseReservationDto extends (0, mapped_types_1.PartialType)(create_course_reservation_dto_1.CreateCourseReservationDto) {
}
exports.UpdateCourseReservationDto = UpdateCourseReservationDto;
//# sourceMappingURL=update-course_reservation.dto.js.map