import { Request, Response } from "express";
import UsersGroupService from "@src/services/usersGroupService";

class UsersGroupController {
  private usersGroupService: UsersGroupService;

  constructor() {
    this.usersGroupService = new UsersGroupService();
  }

  public getUsersByGroupId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { group_id } = req.params;
      const usersGroup = await this.usersGroupService.getUsersByGroupId(
        +group_id
      );
      res.status(200).json(usersGroup);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public addUserToGroup = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { user_id } = req.body;
      const { group_id } = req.params;
      const newUserInGroup = await this.usersGroupService.addUserToGroup(
        +user_id,
        +group_id
      );
      res.status(200).json({ message: "User was successfuly added to group" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteUserFromGroup = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { group_id } = req.params;
      const { user_id } = req.body;

      const deletedUser = await this.usersGroupService.deleteUserFromGroup(
        user_id,
        +group_id
      );
      res.status(200).json({ message: "User was successfully deleted!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default UsersGroupController;
