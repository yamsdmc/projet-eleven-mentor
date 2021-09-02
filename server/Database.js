"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var pg_1 = require("pg");
exports.client = new pg_1.Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
});
