"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groupController_1 = __importDefault(require("@src/controller/groupController"));
class GroupsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.groupController = new groupController_1.default();
        this.initializeRoutes = () => {
            this.router.get("", this.groupController.getGroups);
            this.router.get("/:group_id", this.groupController.getGroupById);
            this.router.get("/name/:name", this.groupController.getGroupByName);
            this.router.post("/create-group", this.groupController.createGroup);
            this.router.patch("/update-group/:group_id", this.groupController.updateGroup);
            this.router.delete("/delete-group/:group_id", this.groupController.deleteGroup);
        };
        this.groupRoutes = () => {
            return this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = GroupsRoutes;
