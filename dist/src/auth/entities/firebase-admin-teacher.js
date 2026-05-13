"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseTeacherModule = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const firebaseteacherProvider = {
    provide: 'FIREBASE_TEACHER',
    useFactory: () => {
        const appName = 'teacher-app';
        const existingApp = admin.apps.find(app => app.name === appName);
        if (existingApp) {
            return existingApp;
        }
        const serviceAccount = {
            project_id: process.env.FIREBASE_PROJECT_ID2,
            client_email: process.env.FIREBASE_CLIENT_EMAIL2,
            private_key: process.env.FIREBASE_PRIVATE_KEY2?.replace(/\\n/g, '\n'),
        };
        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        }, appName);
    },
};
let FirebaseTeacherModule = class FirebaseTeacherModule {
};
exports.FirebaseTeacherModule = FirebaseTeacherModule;
exports.FirebaseTeacherModule = FirebaseTeacherModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [firebaseteacherProvider],
        exports: [firebaseteacherProvider],
    })
], FirebaseTeacherModule);
//# sourceMappingURL=firebase-admin-teacher.js.map