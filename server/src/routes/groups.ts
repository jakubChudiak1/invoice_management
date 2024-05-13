import express, { Router } from "express";
import GroupController from "@src/controller/groupController";

class GroupsRoutes {
  private router: Router = express.Router();
  private groupController: GroupController = new GroupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = (): void => {
    this.router.get("", this.groupController.getGroups);
    this.router.get("/:group_id", this.groupController.getGroupById);
    this.router.get("/name/:name", this.groupController.getGroupByName);
    this.router.post("/create-group", this.groupController.createGroup);
    this.router.patch(
      "/update-group/:group_id",
      this.groupController.updateGroup
    );
    this.router.delete(
      "/delete-group/:group_id",
      this.groupController.deleteGroup
    );
  };

  public groupRoutes = (): Router => {
    return this.router;
  };
}
export default GroupsRoutes;
