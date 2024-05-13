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
class UsersInvoiceService {
    constructor() {
        this.getUsersInvoices = (userId) => __awaiter(this, void 0, void 0, function* () {
            const usersInvoices = yield db_1.db
                .selectFrom("users_invoices as ui")
                .leftJoin("users as u", "u.user_id", "ui.user_id")
                .leftJoin("invoices as i", "i.invoice_id", "ui.invoice_id")
                .select([
                "ui.user_invoice_id",
                "u.user_id",
                "i.invoice_id",
                "i.name as invoice_name",
                "i.description",
            ])
                .where("ui.user_id", "=", userId)
                .execute();
            return usersInvoices;
        });
        this.getUsersInoviceById = (userInvoiceId) => __awaiter(this, void 0, void 0, function* () {
            const usersInvoice = yield db_1.db
                .selectFrom("users_invoices as ui")
                .leftJoin("users as u", "u.user_id", "ui.user_id")
                .leftJoin("invoices as i", "i.invoice_id", "ui.invoice_id")
                .select([
                "ui.user_invoice_id",
                "u.user_id",
                "i.invoice_id",
                "i.name as invoice_name",
                "i.description",
            ])
                .where("ui.user_invoice_id", "=", userInvoiceId)
                .executeTakeFirst();
            return usersInvoice;
        });
        this.createUsersInvoice = (invoiceId, userId) => __awaiter(this, void 0, void 0, function* () {
            const newUsersInvoice = yield db_1.db
                .insertInto("users_invoices")
                .values({ user_id: userId, invoice_id: invoiceId })
                .executeTakeFirst();
            return newUsersInvoice.insertId;
        });
        this.deleteUsersInvoice = (userInvoiceId) => __awaiter(this, void 0, void 0, function* () {
            const deletedInvoice = yield db_1.db
                .deleteFrom("users_invoices")
                .where("user_invoice_id", "=", userInvoiceId)
                .executeTakeFirst();
            return deletedInvoice;
        });
    }
}
exports.default = UsersInvoiceService;
