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
class InvoiceFolderService {
    constructor() {
        this.getUsersFolders = (userId) => __awaiter(this, void 0, void 0, function* () {
            const usersFolders = yield db_1.db
                .selectFrom("invoice_folders")
                .selectAll()
                .where("user_id", "=", userId)
                .execute();
            return usersFolders;
        });
        this.getUsersFolderById = (userId, folderId) => __awaiter(this, void 0, void 0, function* () {
            const usersFolder = yield db_1.db
                .selectFrom("invoice_folders")
                .selectAll()
                .where("user_id", "=", userId)
                .where("folder_id", "=", folderId)
                .executeTakeFirst();
            return usersFolder;
        });
        this.createFolder = (userId, name, createdAt, rootFolder) => __awaiter(this, void 0, void 0, function* () {
            const newFolder = yield db_1.db
                .insertInto("invoice_folders")
                .values({
                user_id: userId,
                name: name,
                created_at: createdAt,
                root_folder: rootFolder,
            })
                .executeTakeFirst();
            return newFolder.insertId;
        });
        this.changeFoldersName = (userId, folderId, name) => __awaiter(this, void 0, void 0, function* () {
            const newFoldersName = yield db_1.db
                .updateTable("invoice_folders")
                .set({ name: name })
                .where("folder_id", "=", folderId)
                .where("user_id", "=", userId)
                .executeTakeFirst();
            return newFoldersName;
        });
        this.deleteFolder = (userId, folderId) => __awaiter(this, void 0, void 0, function* () {
            const deletedFolder = yield db_1.db
                .deleteFrom("invoice_folders")
                .where("folder_id", "=", folderId)
                .where("user_id", "=", userId)
                .executeTakeFirst();
            return deletedFolder;
        });
    }
}
exports.default = InvoiceFolderService;
