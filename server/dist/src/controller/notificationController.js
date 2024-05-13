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
const notificationService_1 = __importDefault(require("@src/services/notificationService"));
class NotificationController {
    constructor() {
        this.getUsersNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user_id !== undefined) {
                    const usersNotifications = yield this.notificationService.getUsersNotifications(req.session.user_id);
                    res.status(200).json(usersNotifications);
                }
                else {
                    res.status(400).json({ message: "Unathorized!" });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getUsersNotificationById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { notification_id } = req.params;
                const notification = yield this.notificationService.getUsersNotificationById(+notification_id);
                res.status(200).json(notification);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.createNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, description, created_at } = req.body;
                const newNotification = yield this.notificationService.createNotification(user_id, description, created_at);
                res
                    .status(200)
                    .json({ message: "New notification was successfuly created" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.setNotificationStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { notification_id } = req.body;
                const notificationStatus = yield this.notificationService.setNotificationStatus(notification_id, true);
                res.status(200).json({ message: "Notification was read" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.notificationService = new notificationService_1.default();
    }
}
exports.default = NotificationController;
