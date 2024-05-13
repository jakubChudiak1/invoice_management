import { Redis } from "ioredis";
import dotnev from "dotenv-safe";

dotnev.config();

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
});

export default redisClient;
