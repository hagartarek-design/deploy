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
exports.RolesSeeder = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjs/common/constants");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../role/entities/role.entity");
let RolesSeeder = class RolesSeeder {
    constructor(dataSource, modulesContainer, reflector) {
        this.dataSource = dataSource;
        this.modulesContainer = modulesContainer;
        this.reflector = reflector;
    }
    async seed() {
        const roleRepo = this.dataSource.getRepository(role_entity_1.Role);
        const staticRoutes = [
            { endpoint: 'uploads', method: 'get' },
            { endpoint: 'pdf-images', method: 'get' },
        ];
        for (const route of staticRoutes) {
            const exists = await roleRepo.findOne({
                where: {
                    module_name: 'static',
                    endpoint: route.endpoint,
                    method: route.method,
                },
            });
            if (!exists) {
                const role = roleRepo.create({
                    module_name: 'static',
                    endpoint: route.endpoint,
                    method: route.method,
                    name: 'user',
                    query: null,
                    can_teacher: true,
                    can_student: false,
                });
                await roleRepo.save(role);
                console.log(`✅ Added static route: ${route.endpoint}`);
            }
        }
        for (const [, moduleRef] of this.modulesContainer.entries()) {
            const controllers = [...moduleRef.controllers.values()];
            for (const wrapper of controllers) {
                const controllerClass = wrapper.metatype;
                if (!controllerClass)
                    continue;
                const moduleName = controllerClass.name
                    .replace('Controller', '')
                    .toLowerCase();
                const controllerPath = this.reflector.get(constants_1.PATH_METADATA, controllerClass) || '';
                const methods = Object.getOwnPropertyNames(controllerClass.prototype).filter((m) => m !== 'constructor');
                for (const methodName of methods) {
                    const methodRef = controllerClass.prototype[methodName];
                    const methodPath = this.reflector.get(constants_1.PATH_METADATA, methodRef);
                    const requestMethod = this.reflector.get(constants_1.METHOD_METADATA, methodRef);
                    if (methodPath === undefined || requestMethod === undefined)
                        continue;
                    const fullPath = `${controllerPath}/${Array.isArray(methodPath) ? methodPath[0] : methodPath}`
                        .replace(/^\/+|\/+$/g, '')
                        .toLowerCase();
                    const httpMethod = common_1.RequestMethod[requestMethod].toLowerCase();
                    const queryKeys = this.extractQueryKeys(methodRef);
                    const exists = await roleRepo.findOne({
                        where: {
                            module_name: moduleName,
                            endpoint: fullPath,
                            method: httpMethod,
                        },
                    });
                    if (exists)
                        continue;
                    const role = roleRepo.create({
                        module_name: moduleName,
                        endpoint: fullPath,
                        method: httpMethod,
                        query: queryKeys ? queryKeys.join(',') : null,
                        name: 'user',
                        can_teacher: true,
                        can_student: false,
                    });
                    await roleRepo.save(role);
                    console.log(`✅ Added role: ${moduleName} -> ${fullPath} [${httpMethod}] query=${role.query}`);
                }
            }
        }
        console.log('🎉 Roles seeding finished!');
    }
    extractQueryKeys(methodRef) {
        const args = Reflect.getMetadata('__routeArguments__', methodRef);
        if (!args)
            return null;
        const queryKeys = Object.values(args)
            .filter((arg) => arg.type === 4)
            .map((arg) => arg.data)
            .filter(Boolean);
        return queryKeys.length ? queryKeys : null;
    }
};
exports.RolesSeeder = RolesSeeder;
exports.RolesSeeder = RolesSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        core_1.ModulesContainer,
        core_1.Reflector])
], RolesSeeder);
//# sourceMappingURL=script.js.map