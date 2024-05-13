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
const invoiceFolderService_1 = __importDefault(require("@src/services/invoiceFolderService"));
class InvoiceFolderController {
    constructor() {
        this.getUsersFolders = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user_id !== undefined) {
                    const usersFolders = yield this.invoiceFolderService.getUsersFolders(req.session.user_id);
                    res.status(200).json(usersFolders);
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getUsersFolderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { folder_id } = req.params;
                if (req.session.user_id !== undefined) {
                    const usersFolder = yield this.invoiceFolderService.getUsersFolderById(req.session.user_id, +folder_id);
                    res.status(200).json(usersFolder);
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.createFolder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { created_at, name, root_folder } = req.body;
                if (req.session.user_id !== undefined) {
                    const usersFolder = yield this.invoiceFolderService.createFolder(req.session.user_id, name, created_at, root_folder);
                    res.status(200).json({ message: "Name succesfully created!" });
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
        this.changeFoldersName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const { folder_id } = req.params;
                if (req.session.user_id !== undefined) {
                    const newNameFolder = yield this.invoiceFolderService.changeFoldersName(req.session.user_id, +folder_id, name);
                    res.status(200).json({ message: "Name succesfully changed!" });
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
        this.deleteFolder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { folder_id } = req.params;
                if (req.session.user_id !== undefined) {
                    const deletedFolder = yield this.invoiceFolderService.deleteFolder(req.session.user_id, +folder_id);
                    res.status(200).json({ message: "Name succesfully deleted!" });
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        });
        this.invoiceFolderService = new invoiceFolderService_1.default();
    }
}
exports.default = InvoiceFolderController;
