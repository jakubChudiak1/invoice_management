"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = __importDefault(require("@src/controller/notificationController"));
class NotificationsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.notificationController = new notificationController_1.default();
        this.initializeRoutes = () => {
            this.router.get("", this.notificationController.getUsersNotifications);
            this.router.get("/:notification_id", this.notificationController.getUsersNotificationById);
            this.router.post("/create", this.notificationController.createNotification);
            this.router.patch("/set-status", this.notificationController.setNotificationStatus);
        };
        this.notificationsRoutes = () => {
            return this, this.router;
        };
        this.initializeRoutes();
    }
}
exports.default = NotificationsRoutes;
