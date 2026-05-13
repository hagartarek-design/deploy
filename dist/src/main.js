"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const path_1 = require("path");
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_guard_1 = require("./common/Gaurds/auth.guard");
const jwt_1 = require("@nestjs/jwt");
const role_guard_1 = require("../common/Gaurds/role.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads', 'pdf-images'), {
        prefix: '/pdf-images/',
    });
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new auth_guard_1.AuthGuard(app.get(jwt_1.JwtService), reflector), new role_guard_1.RolesGuard(reflector));
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
    await app.listen(4000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map