import { db } from "@src/db/db";

class NotificationService {
  constructor() {}

  public getUsersNotifications = async (userId: number) => {
    const notifications = await db
      .selectFrom("notifications")
      .select([
        "notification_id",
        "user_id",
        "description as notification_description",
        "is_read",
        "created_at as notification_created_at",
      ])
      .where("user_id", "=", userId)
      .execute();
    return notifications;
  };

  public getUsersNotificationById = async (notificationId: number) => {
    const notification = await db
      .selectFrom("notifications")
      .select([
        "notification_id",
        "user_id",
        "description as notification_description",
        "is_read",
        "created_at as notification_created_at",
      ])
      .where("notification_id", "=", notificationId)
      .executeTakeFirst();
    return notification;
  };

  public createNotification = async (
    userId: number,
    description: string,
    createdAt: string
  ) => {
    const newNotification = await db
      .insertInto("notifications")
      .values({
        user_id: userId,
        description: description,
        created_at: createdAt,
      })
      .executeTakeFirst();
    return newNotification.insertId;
  };

  public setNotificationStatus = async (
    notificationId: number,
    isRead: boolean
  ) => {
    const notificationStatus = await db
      .updateTable("notifications")
      .set({ is_read: isRead })
      .where("notification_id", "=", notificationId)
      .executeTakeFirst();
    return notificationStatus;
  };
}
export default NotificationService;
