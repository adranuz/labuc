import 'dotenv/config'
import { get } from 'env-var'

// Admin credentials
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

// JWT config
export const AUTHENTICATED_USER_TOKEN_TTL = 86400; // (in second) 1 day = 24 x 60 x 60
export const JWT_SECRET_KEY = get('JWT_SECRET_KEY').required().asString();
export const SECRET_TOKEN = get('SECRET_TOKEN').required().asString()