"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./modules/auth/application/router"));
const router_2 = __importDefault(require("./modules/user/application/router"));
const router_3 = __importDefault(require("./modules/customer/application/router"));
const router_4 = __importDefault(require("./modules/blocking/application/router"));
const container_1 = __importDefault(require("./IoC/container"));
const API_PREFIX = '/api';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(API_PREFIX, (0, router_1.default)(container_1.default.cradle));
app.use(API_PREFIX, (0, router_2.default)(container_1.default.cradle));
app.use(API_PREFIX, (0, router_3.default)(container_1.default.cradle));
app.use(API_PREFIX, (0, router_4.default)(container_1.default.cradle));
app.use(container_1.default.cradle.commonMiddleware.errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application started at port ${port}`);
});
