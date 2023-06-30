"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../config");
const prisma_client_1 = __importDefault(require("../../common/persistence/prisma-client"));
class AuthRepository {
    async authenticateUser(email, password) {
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
        const { id, name, roles } = foundUser;
        const isMatchedPassword = await (0, bcryptjs_1.compare)(password, foundUser.password);
        if (!isMatchedPassword)
            return;
        return {
            id,
            name,
            email,
            roles: roles,
        };
    }
    async getAuthenticatedUserByToken(token) {
        try {
            const decodedData = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET_KEY);
            const { id, name, email, roles } = decodedData;
            if (!id || !email) {
                return;
            }
            return {
                id,
                email,
                token,
                name,
                roles,
            };
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError || err instanceof jsonwebtoken_1.JsonWebTokenError || err instanceof jsonwebtoken_1.NotBeforeError) {
                return;
            }
            throw err;
        }
    }
    async generateToken(user) {
        return (0, jsonwebtoken_1.sign)(user, config_1.JWT_SECRET_KEY, { expiresIn: config_1.AUTHENTICATED_USER_TOKEN_TTL });
    }
}
exports.default = AuthRepository;
