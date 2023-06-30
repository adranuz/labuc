"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleSchema = exports.updateRoleSchema = exports.getRoleSchema = exports.createRoleSchema = exports.deleteUserSchema = exports.updateUserSchema = exports.getUserSchema = exports.createUserSchema = exports.paginationFilterSchema = void 0;
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
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Email is invalid'),
        password: (0, zod_1.string)({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters'),
        roles: (0, zod_1.object)({
            name: (0, zod_1.string)({ required_error: 'Role name is required' })
        }).array(),
    })
});
exports.getUserSchema = (0, zod_1.object)({
    ...params,
});
exports.updateUserSchema = (0, zod_1.object)({
    ...params,
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        roles: (0, zod_1.object)({
            name: (0, zod_1.string)({ required_error: 'Role name is required' })
        }).array(),
    }).partial()
});
exports.deleteUserSchema = (0, zod_1.object)({
    ...params,
});
exports.createRoleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        permissions: (0, zod_1.object)({
            action: (0, zod_1.string)({ required_error: 'Permission name is required' })
        }).array(),
    })
});
exports.getRoleSchema = (0, zod_1.object)({
    ...params,
});
exports.updateRoleSchema = (0, zod_1.object)({
    ...params,
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        permissions: (0, zod_1.object)({
            action: (0, zod_1.string)({ required_error: 'Permission name is required' })
        }).array(),
    }).partial()
});
exports.deleteRoleSchema = (0, zod_1.object)({
    ...params,
});
