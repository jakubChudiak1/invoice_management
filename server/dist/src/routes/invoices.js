"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoiceController_1 = __importDefault(require("@src/controller/invoiceController"));
class InvoicesRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.invoiceController = new invoiceController_1.default();
        this.initializeRoutes = () => {
            this.router.get("", this.invoiceController.getInvoices);
            this.router.get("/name", this.invoiceController.getInvoiceByName);
            this.router.get("/:invoice_id", this.invoiceController.getInvoiceById);
            this.router.post("/create", this.invoiceController.createInvoice);
            this.router.delete("/delete/:invoice_id", this.invoiceController.deleteInvoice);
        };
        this.invoicesRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = InvoicesRoutes;
