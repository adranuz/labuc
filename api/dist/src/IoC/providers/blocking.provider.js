"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const controller_1 = __importDefault(require("../../modules/blocking/application/controller"));
const middleware_1 = __importDefault(require("../../modules/blocking/application/middleware"));
const blocking_repository_1 = __importDefault(require("../../modules/blocking/persistence/blocking.repository"));
const blocking_service_1 = __importDefault(require("../../modules/blocking/service/blocking.service"));
const blockingProvider = (container) => {
    container.register({
        blockingRepository: (0, awilix_1.asClass)(blocking_repository_1.default),
        blockingService: (0, awilix_1.asClass)(blocking_service_1.default),
        blockingController: (0, awilix_1.asClass)(controller_1.default),
        blockingMiddleware: (0, awilix_1.asClass)(middleware_1.default),
    });
};
exports.default = blockingProvider;
