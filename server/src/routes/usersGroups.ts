import express, { Router } from "express";
import UsersGroupController from "@src/controller/usersGroupController";

class UsersGroupsRoutes {
  private router: Router = express.Router();
  private usersGroupsController: UsersGroupController =
    new UsersGroupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("/:group_id", this.usersGroupsController.getUsersByGroupId);
    this.router.post(
      "/add-user/:group_id",
      this.usersGroupsController.addUserToGroup
    );
    this.router.delete(
      "/delete/:group_id",
      this.usersGroupsController.deleteUserFromGroup
    );
  };

  public usersGroupsRoutes = (): Router => {
    return this.router;
  };
}
export default UsersGroupsRoutes;
