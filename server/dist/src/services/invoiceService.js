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
class InvoiceService {
    constructor() {
        this.getInvoices = () => __awaiter(this, void 0, void 0, function* () {
            const invoices = yield db_1.db.selectFrom("invoices").selectAll().execute();
            return invoices;
        });
        this.getInvoiceById = (invoiceId) => __awaiter(this, void 0, void 0, function* () {
            const invoice = yield db_1.db
                .selectFrom("invoices")
                .selectAll()
                .where("invoice_id", "=", invoiceId)
                .executeTakeFirst();
            return invoice;
        });
        this.getInvoiceByName = (name) => __awaiter(this, void 0, void 0, function* () {
            const invoice = yield db_1.db
                .selectFrom("invoices")
                .selectAll()
                .where("name", "=", name)
                .executeTakeFirst();
            return invoice;
        });
        this.createInvoice = (folderId, name, description) => __awaiter(this, void 0, void 0, function* () {
            const newInvoice = yield db_1.db
                .insertInto("invoices")
                .values({ folder_id: folderId, name: name, description: description })
                .executeTakeFirst();
            return newInvoice.insertId;
        });
        this.deleteInvoice = (invoiceId) => __awaiter(this, void 0, void 0, function* () {
            const deletedInvoice = yield db_1.db
                .deleteFrom("invoices")
                .where("invoice_id", "=", invoiceId)
                .executeTakeFirst();
            return deletedInvoice;
        });
    }
}
exports.default = InvoiceService;
