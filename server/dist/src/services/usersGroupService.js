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
class UsersGroupService {
    constructor() {
        this.getUsersByGroupId = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const users = yield db_1.db
                .selectFrom("users_groups as ug")
                .leftJoin("users as u", "u.user_id", "ug.user_id")
                .leftJoin("groups as g", "g.group_id", "ug.group_id")
                .select([
                "ug.group_id",
                "g.name as group_name",
                "ug.user_id",
                (0, kysely_1.sql) `concat(u.first_name,' ',u.surname)`.as("users_name"),
            ])
                .where("ug.group_id", "=", groupId)
                .execute();
            return users;
        });
        this.addUserToGroup = (userId, groupId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.db
                .insertInto("users_groups")
                .values({ group_id: groupId, user_id: userId })
                .executeTakeFirst();
            return user.insertId;
        });
        this.deleteUserFromGroup = (userId, groupId) => __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield db_1.db
                .deleteFrom("users_groups")
                .where("user_id", "=", userId)
                .where("group_id", "=", groupId)
                .executeTakeFirst();
            return deletedUser;
        });
    }
}
exports.default = UsersGroupService;
