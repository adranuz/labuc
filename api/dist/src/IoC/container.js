"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const auth_provider_1 = __importDefault(require("./providers/auth.provider"));
const user_provider_1 = __importDefault(require("./providers/user.provider"));
const customer_provider_1 = __importDefault(require("./providers/customer.provider"));
const blocking_provider_1 = __importDefault(require("./providers/blocking.provider"));
const common_provider_1 = __importDefault(require("./providers/common.provider"));
const container = (0, awilix_1.createContainer)({
    injectionMode: awilix_1.InjectionMode.CLASSIC,
});
(0, auth_provider_1.default)(container);
(0, user_provider_1.default)(container);
(0, customer_provider_1.default)(container);
(0, blocking_provider_1.default)(container);
(0, common_provider_1.default)(container);
exports.default = container;
