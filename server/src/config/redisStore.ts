import RedisStore from "connect-redis";
import redisClient from "./redisClient";

const redisStore = new RedisStore({
  prefix: "invoice_management:",
  client: redisClient,
});

export default redisStore;
