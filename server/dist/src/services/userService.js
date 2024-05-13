"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@src/db/db");
const kysely_1 = require("kysely");
class UserService {
    constructor() {
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield db_1.db
                .selectFrom("users as u")
                .select([
                "user_id",
                "u.email",
                (0, kysely_1.sql) `concat(first_name, ' ', surname)`.as("full_name"),
                "is_verified",
            ])
                .execute();
            return users;
        });
        this.getUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.db
                .selectFrom("users")
                .select([
                "user_id",
                "email",
                (0, kysely_1.sql) `concat(first_name, ' ', surname)`.as("full_name"),
                "is_verified",
            ])
                .where("user_id", "=", userId)
                .executeTakeFirst();
            return user;
        });
        this.getUserByEmail = (userEmail) => __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.db
                .selectFrom("users")
                .select(["user_id", "email", "first_name", "surname", "password"])
                .where("email", "=", userEmail)
                .executeTakeFirst();
            return user;
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const { email, first_name, surname, password } = user;
            const newUser = yield db_1.db
                .insertInto("users")
                .values({
                email: email,
                first_name: first_name,
                surname: surname,
                password: password,
            })
                .executeTakeFirst();
            return newUser.insertId;
        });
        this.verifyUser = (userId, isVerified) => __awaiter(this, void 0, void 0, function* () {
            const verifiedUser = yield db_1.db
                .updateTable("users")
                .set({ is_verified: isVerified })
                .where("user_id", "=", userId)
                .executeTakeFirst();
            return verifiedUser;
        });
    }
}
exports.default = UserService;
