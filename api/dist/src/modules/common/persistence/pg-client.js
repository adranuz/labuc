"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Client({
    connectionString: process.env.DATABASE_URL
});
