"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsModule = void 0;
const common_1 = require("@nestjs/common");
const assignments_service_1 = require("./assignments.service");
const assignments_controller_1 = require("./assignments.controller");
const typeorm_1 = require("@nestjs/typeorm");
const assignment_entity_1 = require("./entities/assignment.entity");
const userquestion_entity_1 = require("../teacher/userquestion/entities/userquestion.entity");
const user_entity_1 = require("../teacher/users/entities/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const fileupload_1 = require("../teacher/users/uploads/fileupload");
const attachment_entity_1 = require("../attachments/entities/attachment.entity");
let AssignmentsModule = class AssignmentsModule {
};
exports.AssignmentsModule = AssignmentsModule;
exports.AssignmentsModule = AssignmentsModule = __decorate([
    (0, common_1.Module)({ imports: [
            platform_express_1.MulterModule.register(fileupload_1.multerConfig),
            typeorm_1.TypeOrmModule.forFeature([assignment_entity_1.Assignment, userquestion_entity_1.Userquestion, user_entity_1.User, attachment_entity_1.Attachment])
        ],
        controllers: [assignments_controller_1.AssignmentsController],
        providers: [assignments_service_1.AssignmentsService,
        ],
    })
], AssignmentsModule);
//# sourceMappingURL=assignments.module.js.map