"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
exports.firebaseConfig = {
    apiKey: "AIzaSyC9adMuePZXrofGk0Q2aVO6BJnmYVqvd2U",
    authDomain: "teacherportal-45120.firebaseapp.com",
    projectId: "teacherportal-45120",
    storageBucket: "teacherportal-45120.firebasestorage.app",
    messagingSenderId: "295814051417",
    appId: "1:295814051417:web:c666b87a9716ba4ea52348",
    measurementId: "G-LY0PYGS91Y"
};
const app = (0, app_1.initializeApp)(exports.firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
//# sourceMappingURL=firebase.config.js.map