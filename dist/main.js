"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const path_1 = require("path");
const express = require("express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads', 'pdf-images'), {
        prefix: '/pdf-images/',
    });
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(4000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map