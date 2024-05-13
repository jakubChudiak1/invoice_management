import express, { Router } from "express";
import NotificationController from "@src/controller/notificationController";

class NotificationsRoutes {
  private router: Router = express.Router();
  private notificationController: NotificationController =
    new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.notificationController.getUsersNotifications);
    this.router.get(
      "/:notification_id",
      this.notificationController.getUsersNotificationById
    );
    this.router.post("/create", this.notificationController.createNotification);
    this.router.patch(
      "/set-status",
      this.notificationController.setNotificationStatus
    );
  };

  public notificationsRoutes = (): Router => {
    return this, this.router;
  };
}
export default NotificationsRoutes;
