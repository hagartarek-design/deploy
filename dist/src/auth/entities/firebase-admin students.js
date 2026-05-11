"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const firebaseAdminProvider = {
    provide: 'FIREBASE_ADMIN',
    useFactory: () => {
        if (admin.apps.length === 0) {
            const serviceAccount = {
                project_id: process.env.FIREBASE_PROJECT_ID,
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            };
            console.log(serviceAccount);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
        return admin;
    },
};
let FirebaseAdminModule = class FirebaseAdminModule {
};
exports.FirebaseAdminModule = FirebaseAdminModule;
exports.FirebaseAdminModule = FirebaseAdminModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [firebaseAdminProvider],
        exports: [firebaseAdminProvider],
    })
], FirebaseAdminModule);
//# sourceMappingURL=firebase-admin%20students.js.map