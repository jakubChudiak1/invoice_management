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
class GroupService {
    constructor() {
        this.getGroups = () => __awaiter(this, void 0, void 0, function* () {
            const groups = yield db_1.db.selectFrom("groups").selectAll().execute();
            return groups;
        });
        this.getGroupById = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const group = yield db_1.db
                .selectFrom("groups")
                .selectAll()
                .where("group_id", "=", groupId)
                .executeTakeFirst();
            return group;
        });
        this.getGroupByName = (groupName) => __awaiter(this, void 0, void 0, function* () {
            const group = yield db_1.db
                .selectFrom("groups")
                .selectAll()
                .where("name", "=", groupName)
                .executeTakeFirst();
            return group;
        });
        this.createGroup = (groupName) => __awaiter(this, void 0, void 0, function* () {
            const newGroup = yield db_1.db
                .insertInto("groups")
                .values({ name: groupName })
                .executeTakeFirst();
            return newGroup.insertId;
        });
        this.updateGroup = (groupId, groupName) => __awaiter(this, void 0, void 0, function* () {
            const updatedGroup = yield db_1.db
                .updateTable("groups")
                .set({ name: groupName })
                .where("group_id", "=", groupId)
                .executeTakeFirst();
            return updatedGroup;
        });
        this.deleteGroup = (groupId) => __awaiter(this, void 0, void 0, function* () {
            const deletedGroup = yield db_1.db
                .deleteFrom("groups")
                .where("group_id", "=", groupId)
                .executeTakeFirst();
            return deletedGroup;
        });
    }
}
exports.default = GroupService;
