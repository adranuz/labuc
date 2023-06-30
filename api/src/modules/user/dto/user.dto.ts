import { Role, Permission } from '@prisma/client'
import UserEntity from '../entities/user.entity';

export interface PaginationFilterDTO {
  perPage?: number;
  page?: number;
  q?: string;
}

export interface CreateUserDTO {
  email: string;
  name: string;
  password: string;
  roles: Pick<Role, 'name'>[];
}

export interface UpdateUserDTO {
  name?: string;
  roles?: Pick<Role, 'name'>[];
}

export type PublicUserDTO = Omit<UserEntity, 'password'>;

export type PublicUsersDTO = {
  total: number
  page: number
  perPage: number
  data: PublicUserDTO[]
};

export interface AuthenticatedUserDTO extends PublicUserDTO {
  token: string;
}

export interface CreateRoleDTO {
  name: string;
  permissions: Pick<Permission, 'action'>[];
}

export interface UpdateRoleDTO {
  name?: string;
  permissions?: Pick<Permission, 'action'>[];
}
