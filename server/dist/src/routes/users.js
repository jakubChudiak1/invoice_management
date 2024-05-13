"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("@src/controller/userController"));
class UsersRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new userController_1.default();
        this.initializeRoutes = () => {
            this.router.get("", this.userController.getUsers);
            this.router.get("/:user_id", this.userController.getUserById);
        };
        this.userRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = UsersRoutes;
