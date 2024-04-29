import { Request, Response } from "express";
import UserService from "@src/services/userService";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const user = await this.userService.getUserById(+user_id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
}

export default UserController;
