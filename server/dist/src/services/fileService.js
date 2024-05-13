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
class FileService {
    constructor() {
        this.getInvoicesFiles = (invoiceId) => __awaiter(this, void 0, void 0, function* () {
            const files = yield db_1.db
                .selectFrom("files")
                .selectAll()
                .where("invoice_id", "=", invoiceId)
                .execute();
            return files;
        });
        this.getFileById = (fileId) => __awaiter(this, void 0, void 0, function* () {
            const file = yield db_1.db
                .selectFrom("files")
                .selectAll()
                .where("file_id", "=", fileId)
                .executeTakeFirst();
            return file;
        });
        this.createFile = (invoiceId, path) => __awaiter(this, void 0, void 0, function* () {
            const newFile = yield db_1.db
                .insertInto("files")
                .values({ invoice_id: invoiceId, path: path })
                .executeTakeFirst();
            return newFile.insertId;
        });
        this.deleteFile = (fileId) => __awaiter(this, void 0, void 0, function* () {
            const deletedFile = yield db_1.db
                .deleteFrom("files")
                .where("file_id", "=", fileId)
                .executeTakeFirst();
            return deletedFile;
        });
    }
}
exports.default = FileService;
