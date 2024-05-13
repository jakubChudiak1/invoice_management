import session from "express-session";
import redisStore from "@src/config/redisStore";
import { v4 as gennuid } from "uuid";
import dotnev from "dotenv-safe";

dotnev.config();

const sessionMiddleware = session({
  name: "Session",
  genid(req) {
    return gennuid();
  },
  secret: String(process.env.SECRET_KEY),
  saveUninitialized: false,
  store: redisStore,
  resave: false,
  cookie: {
    httpOnly: true,
    path: "/",
    maxAge: 1 * 1000 * 60 * 60 * 24 * 14,
    sameSite: "none",
  },
});

export default sessionMiddleware;
