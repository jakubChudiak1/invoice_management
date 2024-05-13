"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoiceFolderController_1 = __importDefault(require("@src/controller/invoiceFolderController"));
class InvoiceFoldersRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.invoiceFolderController = new invoiceFolderController_1.default();
        this.initializeRoutes = () => {
            this.router.get("", this.invoiceFolderController.getUsersFolders);
            this.router.get("/:folder_id", this.invoiceFolderController.getUsersFolderById);
            this.router.post("/create", this.invoiceFolderController.createFolder);
            this.router.patch("/change-name/:filter_id", this.invoiceFolderController.changeFoldersName);
            this.router.delete("/delete/:folder_id", this.invoiceFolderController.deleteFolder);
        };
        this.invoiceFoldersRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = InvoiceFoldersRoutes;
