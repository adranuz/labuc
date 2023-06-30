import { hashSync } from 'bcryptjs';
import prismaClient from '../../common/persistence/prisma-client';
import { Prisma } from '@prisma/client';

import Option from '../../common/types/Option.type';
import { CreateRoleDTO, CreateUserDTO, PaginationFilterDTO, PublicUserDTO, PublicUsersDTO, UpdateUserDTO, UpdateRoleDTO } from '../dto/user.dto';
import IUserRepository from '../service/IUserRepository';

export default class UserRepository implements IUserRepository {
  async createUser({ name, email, password, roles }: CreateUserDTO): Promise<PublicUserDTO> {
    const createdUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 8),
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

  async getUserById(id: string): Promise<Option<PublicUserDTO>> {
    const foundUser = await prismaClient.user.findUnique({
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

    if (!foundUser) return;

    const { name, email, roles } = foundUser;

    return {
      id,
      name,
      email,
      roles,
    };
  }

  async getUserByEmail(email: string): Promise<Option<PublicUserDTO>> {
    const foundUser = await prismaClient.user.findUnique({
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

    if (!foundUser) return;

    const { name, id, roles } = foundUser;

    return {
      id,
      name,
      email,
      roles,
    };
  }

  async updateUser(id: string, { name, roles }: UpdateUserDTO): Promise<Option<PublicUserDTO>> {
    const updatedUser = await prismaClient.user.update({
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

  async deleteUser(id: string): Promise<PublicUserDTO> {
    const deletedUser = await prismaClient.user.delete({
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

    return deletedUser
  }

  async listUsers({perPage = 10, page = 0, q: searchText = ''}: PaginationFilterDTO ): Promise<Option<PublicUsersDTO>> {
    const where: Prisma.UserWhereInput = {
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
    }
    
    const usersQuery = prismaClient.user.findMany({
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

    const [users, usersCount] = await prismaClient.$transaction([
      usersQuery,
      prismaClient.user.count({ where }),
    ])

    return {
      total: usersCount,
      page: Number(page),
      perPage: Number(perPage),
      data: users
    };
  }

  async createRole({ name, permissions }: CreateRoleDTO): Promise<any> {
    const createdRole = await prismaClient.role.create({
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

  async getRole(id: string): Promise<Option<any>> {
    const foundUser = await prismaClient.role.findUnique({
      where: { id },
      include: {
        permissions: {
          select: {
            action: true,
          }
        }
      }
    });

    if (!foundUser) return;

    const { name, permissions } = foundUser;

    return {
      id,
      name,
      permissions,
    };
  }

  async updateRole(id: string, { name, permissions }: UpdateRoleDTO): Promise<Option<any>> {
    const updatedRole = await prismaClient.role.update({
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

  async deleteRole(id: string): Promise<any> {
    const deletedRole = await prismaClient.role.delete({
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

    return deletedRole
  }

  async listRoles({perPage = 10, page = 0, q: searchText = ''}: PaginationFilterDTO ): Promise<Option<any>> {
    const where: Prisma.RoleWhereInput = {
      OR: [
        {
          name: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
      ],
    }
    
    const rolesQuery = prismaClient.role.findMany({
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

    const [roles, rolesCount] = await prismaClient.$transaction([
      rolesQuery,
      prismaClient.role.count({ where }),
    ])

    return {
      total: rolesCount,
      page: Number(page),
      perPage: Number(perPage),
      data: roles
    };
  }

  async listPermissions({perPage = 10, page = 0, q: searchText = ''}: PaginationFilterDTO ): Promise<Option<any>> {
    const where: Prisma.PermissionWhereInput = {
      OR: [
        {
          action: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
      ],
    }
    
    const permissionsQuery = prismaClient.permission.findMany({
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

    const [permissions, permissionsCount] = await prismaClient.$transaction([
      permissionsQuery,
      prismaClient.permission.count({ where }),
    ])

    return {
      total: permissionsCount,
      page: Number(page),
      perPage: Number(perPage),
      data: permissions
    };
  }
}
