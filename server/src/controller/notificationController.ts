import { Request, Response } from "express";
import NotificationService from "@src/services/notificationService";

class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  public getUsersNotifications = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (req.session.user_id !== undefined) {
        const usersNotifications =
          await this.notificationService.getUsersNotifications(
            req.session.user_id
          );
        res.status(200).json(usersNotifications);
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUsersNotificationById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { notification_id } = req.params;
      const notification =
        await this.notificationService.getUsersNotificationById(
          +notification_id
        );
      res.status(200).json(notification);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createNotification = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { user_id, description, created_at } = req.body;
      const newNotification = await this.notificationService.createNotification(
        user_id,
        description,
        created_at
      );
      res
        .status(200)
        .json({ message: "New notification was successfuly created" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public setNotificationStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { notification_id } = req.body;
      const notificationStatus =
        await this.notificationService.setNotificationStatus(
          notification_id,
          true
        );
      res.status(200).json({ message: "Notification was read" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default NotificationController;
