"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(data) {
        return this.userRepository.createUser(data);
    }
    getUserByEmail(email) {
        return this.userRepository.getUserByEmail(email);
    }
    getUserById(id) {
        return this.userRepository.getUserById(id);
    }
    updateUser(id, data) {
        return this.userRepository.updateUser(id, data);
    }
    deleteUser(id) {
        return this.userRepository.deleteUser(id);
    }
    listUsers(data) {
        return this.userRepository.listUsers(data);
    }
    createRole(data) {
        return this.userRepository.createRole(data);
    }
    getRole(id) {
        return this.userRepository.getRole(id);
    }
    updateRole(id, data) {
        return this.userRepository.updateRole(id, data);
    }
    deleteRole(id) {
        return this.userRepository.deleteRole(id);
    }
    listRoles(data) {
        return this.userRepository.listRoles(data);
    }
    listPermissions(data) {
        return this.userRepository.listPermissions(data);
    }
}
exports.default = UserService;
