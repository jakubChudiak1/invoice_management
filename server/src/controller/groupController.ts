import { Request, Response } from "express";
import GroupService from "@src/services/groupService";

class GroupController {
  private groupService: GroupService;

  constructor() {
    this.groupService = new GroupService();
  }

  public getGroups = async (req: Request, res: Response): Promise<void> => {
    try {
      const groups = await this.groupService.getGroups();
      res.status(200).json(groups);
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  };

  public getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { group_id } = req.params;
      const group = await this.groupService.getGroupById(+group_id);
      res.status(200).json({ group });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getGroupByName = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name } = req.params;
      const group = await this.groupService.getGroupByName(name);
      res.status(200).json(group);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const newGroup = await this.groupService.createGroup(name);
      res.status(200).json({ message: "Group was successfuly!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const { group_id } = req.params;
      const updatedGroup = await this.groupService.updateGroup(+group_id, name);
      res.status(200).json({ message: "Group was successfuly updated" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteGroup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { group_id } = req.params;
      const deletedGroup = await this.groupService.deleteGroup(+group_id);
      res.status(200).json({ message: "Group was successfuly deleted!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default GroupController;
