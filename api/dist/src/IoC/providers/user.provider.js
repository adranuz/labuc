"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const controller_1 = __importDefault(require("../../modules/user/application/controller"));
const middleware_1 = __importDefault(require("../../modules/user/application/middleware"));
const user_repository_1 = __importDefault(require("../../modules/user/persistence/user.repository"));
const user_service_1 = __importDefault(require("../../modules/user/service/user.service"));
const userProvider = (container) => {
    container.register({
        userRepository: (0, awilix_1.asClass)(user_repository_1.default),
        userService: (0, awilix_1.asClass)(user_service_1.default),
        userController: (0, awilix_1.asClass)(controller_1.default),
        userMiddleware: (0, awilix_1.asClass)(middleware_1.default),
    });
};
exports.default = userProvider;
