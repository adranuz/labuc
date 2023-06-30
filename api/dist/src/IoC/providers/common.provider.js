"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awilix_1 = require("awilix");
const middleware_1 = __importDefault(require("../../modules/common/application/middleware"));
const commonProvider = (container) => {
    container.register({
        commonMiddleware: (0, awilix_1.asClass)(middleware_1.default),
    });
};
exports.default = commonProvider;
