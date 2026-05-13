"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../src/role/entities/role.entity");
let DynamicRoleGuard = class DynamicRoleGuard {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const method = request.method.toLowerCase();
        const rawPath = request.route.path;
        const endpoint = this.normalizePath(rawPath);
        const requestQueryKeys = Object.keys(request.query || {}).sort();
        const roleRepo = this.dataSource.getRepository(role_entity_1.Role);
        const role = await roleRepo.findOne({
            where: { endpoint, method },
        });
        if (!role) {
            throw new common_1.ForbiddenException('No role for this endpoint');
        }
        if (role.query) {
            const allowedQueryKeys = role.query.split(',').sort();
            const match = allowedQueryKeys.length === requestQueryKeys.length &&
                allowedQueryKeys.every((q, i) => q === requestQueryKeys[i]);
            if (!match) {
                throw new common_1.ForbiddenException('Query not allowed for this endpoint');
            }
        }
        return true;
    }
    normalizePath(path) {
        return path
            .replace(/\/\d+/g, '/:id')
            .replace(/\/[a-f0-9-]{36}/gi, '/:id')
            .replace(/^\/+|\/+$/g, '')
            .toLowerCase();
    }
};
exports.DynamicRoleGuard = DynamicRoleGuard;
exports.DynamicRoleGuard = DynamicRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DynamicRoleGuard);
//# sourceMappingURL=dynamicrolegaurd.js.map