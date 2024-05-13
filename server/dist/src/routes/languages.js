"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const languageController_1 = __importDefault(require("@src/controller/languageController"));
class LanguagesRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.languageController = new languageController_1.default();
        this.initializeRoutes = () => {
            this.router.get("", this.languageController.getLanguages);
        };
        this.languageRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = LanguagesRoutes;
