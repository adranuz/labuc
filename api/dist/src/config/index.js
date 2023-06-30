"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = exports.AUTHENTICATED_USER_TOKEN_TTL = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = void 0;
// Admin credentials
exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
// JWT config
exports.AUTHENTICATED_USER_TOKEN_TTL = 86400; // (in second) 1 day = 24 x 60 x 60
exports.JWT_SECRET_KEY = 'secret';
