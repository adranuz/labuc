"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const controller_1 = __importDefault(require("../../modules/pac/application/controller"));
const middleware_1 = __importDefault(require("../../modules/pac/application/middleware"));
const pac_repository_1 = __importDefault(require("../../modules/pac/persistence/pac.repository"));
const pac_service_1 = __importDefault(require("../../modules/pac/service/pac.service"));
const pacProvider = (container) => {
    container.register({
        pacRepository: (0, awilix_1.asClass)(pac_repository_1.default),
        pacService: (0, awilix_1.asClass)(pac_service_1.default),
        pacController: (0, awilix_1.asClass)(controller_1.default),
        pacMiddleware: (0, awilix_1.asClass)(middleware_1.default),
    });
};
exports.default = pacProvider;
