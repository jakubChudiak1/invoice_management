import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import dotenv from "dotenv-safe";
import { DBTypes } from "./types";
dotenv.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
  }),
});

export const db = new Kysely<DBTypes>({
  dialect: dialect,
});
