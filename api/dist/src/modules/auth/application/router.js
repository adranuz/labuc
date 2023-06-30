"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_schema_1 = require("./auth.schema");
exports.default = (cradle) => {
    const router = (0, express_1.Router)();
    router.post('/login', cradle.authMiddleware.validate(auth_schema_1.loginSchema), cradle.authController.login);
    return router;
};
