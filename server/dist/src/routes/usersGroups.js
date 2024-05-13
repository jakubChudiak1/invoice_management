"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersGroupController_1 = __importDefault(require("@src/controller/usersGroupController"));
class UsersGroupsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.usersGroupsController = new usersGroupController_1.default();
        this.initializeRoutes = () => {
            this.router.get("/:group_id", this.usersGroupsController.getUsersByGroupId);
            this.router.post("/add-user/:group_id", this.usersGroupsController.addUserToGroup);
            this.router.delete("/delete/:group_id", this.usersGroupsController.deleteUserFromGroup);
        };
        this.usersGroupsRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = UsersGroupsRoutes;
