"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersInvoiceController_1 = __importDefault(require("@src/controller/usersInvoiceController"));
class UsersInvoicesRoutes {
    constructor() {
        this.usersInvoiceController = new usersInvoiceController_1.default();
        this.router = express_1.default.Router();
        this.initializeRoutes = () => {
            this.router.get("", this.usersInvoiceController.getUsersInvoices);
            this.router.get("/:user_invoice_id", this.usersInvoiceController.getUsersInvoiceById);
            this.router.post("/create", this.usersInvoiceController.createUsersInvoice);
            this.router.delete("/delete/:user_invoice_id", this.usersInvoiceController.deleteUsersInvoice);
        };
        this.userInvoicesRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = UsersInvoicesRoutes;
