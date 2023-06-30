import Option from '../../common/types/Option.type';
import { CreateRoleDTO, CreateUserDTO, PaginationFilterDTO, PublicUserDTO, PublicUsersDTO, UpdateUserDTO, UpdateRoleDTO } from '../dto/user.dto';

export default interface IUserRepository {
  createUser(data: CreateUserDTO): Promise<PublicUserDTO>;
  getUserByEmail(email: string): Promise<Option<PublicUserDTO>>;
  getUserById(id: string): Promise<Option<PublicUserDTO>>;
  updateUser(id: string, data: UpdateUserDTO): Promise<Option<PublicUserDTO>>;
  deleteUser(id: string): Promise<Option<PublicUserDTO>>;
  listUsers(data: PaginationFilterDTO): Promise<Option<PublicUsersDTO>>;
  createRole(data: CreateRoleDTO): Promise<PublicUserDTO>;
  getRole(id: string): Promise<Option<any>>;
  updateRole(id: string, data: UpdateRoleDTO): Promise<Option<any>>;
  deleteRole(id: string): Promise<Option<any>>;
  listRoles(data: PaginationFilterDTO): Promise<Option<any>>;
  listPermissions(data: PaginationFilterDTO): Promise<Option<any>>;
}
