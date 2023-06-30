import Option from '../../common/types/Option.type';
import { CreateRoleDTO, CreateUserDTO, PaginationFilterDTO, PublicUserDTO, PublicUsersDTO, UpdateUserDTO, UpdateRoleDTO } from '../dto/user.dto';
import IUserRepository from './IUserRepository';

export default class UserService {
  constructor(private userRepository: IUserRepository) {}

  createUser(data: CreateUserDTO): Promise<PublicUserDTO> {
    return this.userRepository.createUser(data);
  }

  getUserByEmail(email: string): Promise<Option<PublicUserDTO>> {
    return this.userRepository.getUserByEmail(email);
  }

  getUserById(id: string): Promise<Option<PublicUserDTO>> {
    return this.userRepository.getUserById(id);
  }

  updateUser(id: string, data: UpdateUserDTO): Promise<Option<PublicUserDTO>> {
    return this.userRepository.updateUser(id, data);
  }

  deleteUser(id: string): Promise<Option<PublicUserDTO>> {
    return this.userRepository.deleteUser(id);
  }

  listUsers(data: PaginationFilterDTO): Promise<Option<PublicUsersDTO>> {
    return this.userRepository.listUsers(data);
  }

  createRole(data: CreateRoleDTO): Promise<any> {
    return this.userRepository.createRole(data);
  }

  getRole(id: string): Promise<Option<any>> {
    return this.userRepository.getRole(id);
  }

  updateRole(id: string, data: UpdateRoleDTO): Promise<Option<any>> {
    return this.userRepository.updateRole(id, data);
  }

  deleteRole(id: string): Promise<Option<any>> {
    return this.userRepository.deleteRole(id);
  }

  listRoles(data: PaginationFilterDTO): Promise<Option<any>> {
    return this.userRepository.listRoles(data);
  }

  listPermissions(data: PaginationFilterDTO): Promise<Option<any>> {
    return this.userRepository.listPermissions(data);
  }
}
