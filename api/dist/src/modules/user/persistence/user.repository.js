"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const prisma_client_1 = __importDefault(require("../../common/persistence/prisma-client"));
class UserRepository {
    async createUser({ name, email, password, roles }) {
        const createdUser = await prisma_client_1.default.user.create({
            data: {
                name,
                email,
                password: (0, bcryptjs_1.hashSync)(password, 8),
                roles: {
                    connect: roles
                }
            },
            include: {
                roles: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                action: true
                            }
                        }
                    }
                }
            }
        });
        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            roles: createdUser.roles,
        };
    }
    async getUserById(id) {
        const foundUser = await prisma_client_1.default.user.findUnique({
            where: { id },
            include: {
                roles: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                action: true
                            }
                        }
                    }
                }
            }
        });
        if (!foundUser)
            return;
        const { name, email, roles } = foundUser;
        return {
            id,
            name,
            email,
            roles,
        };
    }
    async getUserByEmail(email) {
        const foundUser = await prisma_client_1.default.user.findUnique({
            where: { email },
            include: {
                roles: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                action: true
                            }
                        }
                    }
                }
            }
        });
        if (!foundUser)
            return;
        const { name, id, roles } = foundUser;
        return {
            id,
            name,
            email,
            roles,
        };
    }
    async updateUser(id, { name, roles }) {
        const updatedUser = await prisma_client_1.default.user.update({
            where: {
                id
            },
            data: {
                name,
                roles: {
                    set: [],
                    connect: roles
                }
            },
            include: {
                roles: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                action: true
                            }
                        }
                    }
                }
            }
        });
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            roles: updatedUser.roles,
        };
    }
    async deleteUser(id) {
        const deletedUser = await prisma_client_1.default.user.delete({
            where: {
                id
            },
            include: {
                roles: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                action: true
                            }
                        }
                    }
                }
            }
        });
        return deletedUser;
    }
    async listUsers({ perPage = 10, page = 0, q: searchText = '' }) {
        const where = {
            OR: [
                {
                    name: {
                        contains: searchText,
                        mode: 'insensitive'
                    }
                },
                {
                    email: {
                        contains: searchText,
                        mode: 'insensitive'
                    }
                }
            ],
        };
        const usersQuery = prisma_client_1.default.user.findMany({
            skip: Number(perPage) * Number(page),
            take: Number(perPage),
            where,
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                name: true,
                email: true,
                roles: {
                    select: {
                        name: true,
                        permissions: {
                            select: {
                                action: true
                            }
                        }
                    }
                }
            },
        });
        const [users, usersCount] = await prisma_client_1.default.$transaction([
            usersQuery,
            prisma_client_1.default.user.count({ where }),
        ]);
        return {
            total: usersCount,
            page: Number(page),
            perPage: Number(perPage),
            data: users
        };
    }
    async createRole({ name, permissions }) {
        const createdRole = await prisma_client_1.default.role.create({
            data: {
                name,
                permissions: {
                    connect: permissions
                }
            },
            include: {
                permissions: {
                    select: {
                        action: true,
                    }
                }
            }
        });
        return {
            id: createdRole.id,
            name: createdRole.name,
            permissions: createdRole.permissions,
        };
    }
    async getRole(id) {
        const foundUser = await prisma_client_1.default.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    select: {
                        action: true,
                    }
                }
            }
        });
        if (!foundUser)
            return;
        const { name, permissions } = foundUser;
        return {
            id,
            name,
            permissions,
        };
    }
    async updateRole(id, { name, permissions }) {
        const updatedRole = await prisma_client_1.default.role.update({
            where: {
                id
            },
            data: {
                name,
                permissions: {
                    set: [],
                    connect: permissions
                }
            },
            include: {
                permissions: {
                    select: {
                        action: true,
                    }
                }
            }
        });
        return {
            id: updatedRole.id,
            name: updatedRole.name,
            permissions: updatedRole.permissions,
        };
    }
    async deleteRole(id) {
        const deletedRole = await prisma_client_1.default.role.delete({
            where: {
                id
            },
            include: {
                permissions: {
                    select: {
                        action: true,
                    }
                }
            }
        });
        return deletedRole;
    }
    async listRoles({ perPage = 10, page = 0, q: searchText = '' }) {
        const where = {
            OR: [
                {
                    name: {
                        contains: searchText,
                        mode: 'insensitive'
                    }
                },
            ],
        };
        const rolesQuery = prisma_client_1.default.role.findMany({
            skip: Number(perPage) * Number(page),
            take: Number(perPage),
            where,
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                name: true,
                permissions: {
                    select: {
                        action: true,
                    }
                },
                _count: {
                    select: {
                        users: true
                    }
                }
            },
        });
        const [roles, rolesCount] = await prisma_client_1.default.$transaction([
            rolesQuery,
            prisma_client_1.default.role.count({ where }),
        ]);
        return {
            total: rolesCount,
            page: Number(page),
            perPage: Number(perPage),
            data: roles
        };
    }
    async listPermissions({ perPage = 10, page = 0, q: searchText = '' }) {
        const where = {
            OR: [
                {
                    action: {
                        contains: searchText,
                        mode: 'insensitive'
                    }
                },
            ],
        };
        const permissionsQuery = prisma_client_1.default.permission.findMany({
            skip: Number(perPage) * Number(page),
            take: Number(perPage),
            where,
            orderBy: {
                createdAt: 'asc'
            },
            select: {
                id: true,
                action: true,
            },
        });
        const [permissions, permissionsCount] = await prisma_client_1.default.$transaction([
            permissionsQuery,
            prisma_client_1.default.permission.count({ where }),
        ]);
        return {
            total: permissionsCount,
            page: Number(page),
            perPage: Number(perPage),
            data: permissions
        };
    }
}
exports.default = UserRepository;
