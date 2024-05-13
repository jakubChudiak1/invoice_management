"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auhController_1 = __importDefault(require("@src/controller/auhController"));
class AuthsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes = () => {
            this.router.get("/user-data", this.authController.getUsersData);
            this.router.post("/signup", this.authController.signUp);
            this.router.post("/signin", this.authController.signIn);
            this.router.post("/signout", this.authController.signOut);
            this.router.patch("/verify-user", this.authController.verifyUser);
        };
        this.authsRoutes = () => {
            return this.router;
        };
        this.authController = new auhController_1.default();
        this.initializeRoutes();
    }
}
exports.default = AuthsRoutes;
