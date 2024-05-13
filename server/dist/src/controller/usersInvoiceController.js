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
const usersInvoiceService_1 = __importDefault(require("@src/services/usersInvoiceService"));
class UsersInvoiceController {
    constructor() {
        this.getUsersInvoices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (((_a = req.session) === null || _a === void 0 ? void 0 : _a.user_id) !== undefined) {
                    const usersInvoices = yield this.usersInvoiceService.getUsersInvoices(req.session.user_id);
                    res.status(200).json(usersInvoices);
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getUsersInvoiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_invoice_id } = req.params;
                const usersInvoice = yield this.usersInvoiceService.getUsersInoviceById(+user_invoice_id);
                res.status(200).json(usersInvoice);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.createUsersInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoice_id } = req.body;
                if (req.session.user_id !== undefined) {
                    const newUsersInvoice = yield this.usersInvoiceService.createUsersInvoice(invoice_id, req.session.user_id);
                    res
                        .status(200)
                        .json({ message: "Users invoice was successfuly created!" });
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.deleteUsersInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_invoice_id } = req.params;
                const deletedInvoice = yield this.usersInvoiceService.deleteUsersInvoice(+user_invoice_id);
                res.status(200).json({ message: "Users invoice successfuly deleted!" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.usersInvoiceService = new usersInvoiceService_1.default();
    }
}
exports.default = UsersInvoiceController;
