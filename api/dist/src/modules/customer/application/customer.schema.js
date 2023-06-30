"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSchema = exports.updateCustomerSchema = exports.getCustomerSchema = exports.paginationFilterSchema = void 0;
const zod_1 = require("zod");
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)().uuid(),
    }),
};
exports.paginationFilterSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        perPage: (0, zod_1.optional)(zod_1.coerce.number().positive()),
        page: (0, zod_1.optional)(zod_1.coerce.number().nonnegative()),
        q: (0, zod_1.optional)((0, zod_1.string)()),
    })
});
// export const createCustomerSchema = object({
//   body: object({
//     name: string({ required_error: 'Name is required' }),
//     email: string({ required_error: 'Email is required' }).email('Email is invalid'),
//     password: string({ required_error: 'Password is required' })
//       .min(8, 'Password must be more than 8 characters'),
//     roles: object({
//       name: string({ required_error: 'Role name is required' })
//     }).array(),
//   })
// })
exports.getCustomerSchema = (0, zod_1.object)({
    ...params,
});
exports.updateCustomerSchema = (0, zod_1.object)({
    ...params,
    body: (0, zod_1.object)({
        customId: (0, zod_1.string)(),
        name: (0, zod_1.string)(),
        email: (0, zod_1.string)(),
        country: (0, zod_1.string)(),
        registeredName: (0, zod_1.string)(),
        rfc: (0, zod_1.string)(),
        address: (0, zod_1.string)(),
        economicActivity: (0, zod_1.string)(),
        status: (0, zod_1.string)(),
        sellerComments: (0, zod_1.string)(),
        comissionTerm: zod_1.z.date(),
        percentageComissions: zod_1.z.number(),
        products: (0, zod_1.object)({
            name: (0, zod_1.string)({ required_error: 'Product name is required' }),
            shortName: (0, zod_1.string)({ required_error: 'Product short name is required' }),
        }).array(),
        contacts: (0, zod_1.object)({
            name: (0, zod_1.string)({ required_error: 'Contact name is required' }),
            email: (0, zod_1.string)({ required_error: 'Contact email is required' }),
            type: (0, zod_1.string)({ required_error: 'Contact type is required' }),
        }).array(),
    }).partial()
});
exports.deleteCustomerSchema = (0, zod_1.object)({
    ...params,
});
