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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("@src/db/db");
class NotificationService {
    constructor() {
        this.getUsersNotifications = (userId) => __awaiter(this, void 0, void 0, function* () {
            const notifications = yield db_1.db
                .selectFrom("notifications")
                .selectAll()
                .where("user_id", "=", userId)
                .execute();
            return notifications;
        });
        this.getUsersNotificationById = (notificationId) => __awaiter(this, void 0, void 0, function* () {
            const notification = yield db_1.db
                .selectFrom("notifications")
                .selectAll()
                .where("notification_id", "=", notificationId)
                .executeTakeFirst();
            return notification;
        });
        this.createNotification = (userId, description, createdAt) => __awaiter(this, void 0, void 0, function* () {
            const newNotification = yield db_1.db
                .insertInto("notifications")
                .values({
                user_id: userId,
                description: description,
                created_at: createdAt,
            })
                .executeTakeFirst();
            return newNotification.insertId;
        });
        this.setNotificationStatus = (notificationId, isRead) => __awaiter(this, void 0, void 0, function* () {
            const notificationStatus = yield db_1.db
                .updateTable("notifications")
                .set({ is_read: isRead })
                .where("notification_id", "=", notificationId)
                .executeTakeFirst();
            return notificationStatus;
        });
    }
}
exports.default = NotificationService;
