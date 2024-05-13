"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const redisStore_1 = __importDefault(require("@src/config/redisStore"));
const uuid_1 = require("uuid");
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const sessionMiddleware = (0, express_session_1.default)({
    name: "Session",
    genid(req) {
        return (0, uuid_1.v4)();
    },
    secret: String(process.env.SECRET_KEY),
    saveUninitialized: false,
    store: redisStore_1.default,
    resave: false,
    cookie: {
        httpOnly: true,
        path: "/",
        maxAge: 1 * 1000 * 60 * 60 * 24 * 14,
        sameSite: "none",
    },
});
exports.default = sessionMiddleware;
