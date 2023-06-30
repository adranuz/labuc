"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerReportSchema = exports.importBlockingSchema = void 0;
const zod_1 = require("zod");
exports.importBlockingSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        truncate: (0, zod_1.string)({ required_error: 'Truncate is required' })
    }),
    files: zod_1.z.any().array().min(1, { message: 'Se requiere al menos un archivo' }),
});
exports.getCustomerReportSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' })
    })
});
