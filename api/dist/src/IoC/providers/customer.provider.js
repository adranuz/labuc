"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const controller_1 = __importDefault(require("../../modules/customer/application/controller"));
const middleware_1 = __importDefault(require("../../modules/customer/application/middleware"));
const customer_repository_1 = __importDefault(require("../../modules/customer/persistence/customer.repository"));
const customer_service_1 = __importDefault(require("../../modules/customer/service/customer.service"));
const customerProvider = (container) => {
    container.register({
        customerRepository: (0, awilix_1.asClass)(customer_repository_1.default),
        customerService: (0, awilix_1.asClass)(customer_service_1.default),
        customerController: (0, awilix_1.asClass)(controller_1.default),
        customerMiddleware: (0, awilix_1.asClass)(middleware_1.default),
    });
};
exports.default = customerProvider;
