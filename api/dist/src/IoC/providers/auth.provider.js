"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const controller_1 = __importDefault(require("../../modules/auth/application/controller"));
const middleware_1 = __importDefault(require("../../modules/auth/application/middleware"));
const auth_repository_1 = __importDefault(require("../../modules/auth/persistence/auth.repository"));
const auth_service_1 = __importDefault(require("../../modules/auth/service/auth.service"));
const authProvider = (container) => {
    container.register({
        authRepository: (0, awilix_1.asClass)(auth_repository_1.default),
        authService: (0, awilix_1.asClass)(auth_service_1.default),
        authController: (0, awilix_1.asClass)(controller_1.default),
        authMiddleware: (0, awilix_1.asClass)(middleware_1.default),
    });
};
exports.default = authProvider;
