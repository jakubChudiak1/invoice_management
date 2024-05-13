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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoiceService_1 = __importDefault(require("@src/services/invoiceService"));
class InvoiceController {
    constructor() {
        this.getInvoices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const invoices = yield this.invoiceService.getInvoices();
                res.status(200).json(invoices);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getInvoiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoice_id } = req.params;
                const invoice = yield this.invoiceService.getInvoiceById(+invoice_id);
                res.status(200).json(invoice);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getInvoiceByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                if (typeof name !== "string") {
                    res.status(500).json({ message: "Incorrect parameter" });
                    return;
                }
                const invoice = yield this.invoiceService.getInvoiceByName(name);
                res.status(200).json(invoice);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.createInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { folder_id, name, description } = req.body;
                const newInvoice = yield this.invoiceService.createInvoice(folder_id, name, description);
                res.status(200).json({ message: "Invoice was successfuly created!" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.deleteInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoice_id } = req.params;
                const deletedInvoice = yield this.invoiceService.deleteInvoice(+invoice_id);
                res.status(200).json({ message: "Invoice was successfuly deleted!" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.invoiceService = new invoiceService_1.default();
    }
}
exports.default = InvoiceController;
