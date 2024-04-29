"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const kysely_1 = require("kysely");
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool({
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
    }),
});
exports.db = new kysely_1.Kysely({
    dialect: dialect,
});
