"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_redis_1 = __importDefault(require("connect-redis"));
const redisClient_1 = __importDefault(require("./redisClient"));
const redisStore = new connect_redis_1.default({
    prefix: "invoice_management:",
    client: redisClient_1.default,
});
exports.default = redisStore;
