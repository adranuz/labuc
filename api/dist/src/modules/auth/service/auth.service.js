"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async authenticateUser(username, password) {
        const authenticatedUser = await this.authRepository.authenticateUser(username, password);
        if (!authenticatedUser)
            return;
        const token = await this.authRepository.generateToken(authenticatedUser);
        return {
            ...authenticatedUser,
            token,
        };
    }
    async authenticateUserByToken(token) {
        return this.authRepository.getAuthenticatedUserByToken(token);
    }
}
exports.default = AuthService;
