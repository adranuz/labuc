"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsolidatedSchema = exports.getCustomerReportSchema = exports.getBlockingDeviceConsolidatedReportSchema = exports.getBlockingDeviceImportLogSchema = exports.getBlockingDeviceSchema = exports.listBlockingReportSchema = exports.createBlockingReportSchema = exports.paginationFilterSchema = void 0;
const zod_1 = require("zod");
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)().uuid(),
    }),
};
const pagination = (0, zod_1.object)({
    perPage: (0, zod_1.optional)(zod_1.coerce.number().positive()),
    page: (0, zod_1.optional)(zod_1.coerce.number().nonnegative()),
    q: (0, zod_1.optional)((0, zod_1.string)()),
    pagination: (0, zod_1.optional)(zod_1.z.enum(['true', 'false']).transform((value) => value === 'true')),
});
exports.paginationFilterSchema = (0, zod_1.object)({
    query: pagination,
});
exports.createBlockingReportSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        reportedAt: (0, zod_1.string)({ required_error: 'Reported at is required' }),
    }),
    files: zod_1.z.any().array().min(1, { message: 'Se requiere al menos un archivo' }),
});
exports.listBlockingReportSchema = (0, zod_1.object)({
    query: pagination.merge((0, zod_1.object)({
        fields: (0, zod_1.optional)(zod_1.z.enum(['id', 'reportedAt']).array()),
        includeConsolidated: (0, zod_1.optional)(zod_1.z.enum(['true', 'false']).transform((value) => value === 'true'))
    }))
});
exports.getBlockingDeviceSchema = (0, zod_1.object)({
    ...params,
});
exports.getBlockingDeviceImportLogSchema = (0, zod_1.object)({
    ...params,
    query: (0, zod_1.object)({
        type: (0, zod_1.string)()
    })
});
exports.getBlockingDeviceConsolidatedReportSchema = (0, zod_1.object)({
    ...params,
    query: (0, zod_1.object)({
        deviceType: (0, zod_1.optional)((0, zod_1.string)({ required_error: 'Device type is required' }))
    })
});
exports.getCustomerReportSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)().uuid(),
        name: (0, zod_1.string)(),
    }),
    query: (0, zod_1.object)({
        deviceType: (0, zod_1.optional)((0, zod_1.string)({ required_error: 'Device type is required' }))
    })
});
exports.createConsolidatedSchema = (0, zod_1.object)({
    ...params,
});
