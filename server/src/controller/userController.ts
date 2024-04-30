import { Request, Response } from "express";
import UserService from "@src/services/userService";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id } = req.params;
      const user = await this.userService.getUserById(+user_id);
      console.log(user);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, first_name, surname, password } = req.body;
      const newUser = await this.userService.createUser({
        email: email,
        first_name: first_name,
        surname: surname,
        password: password,
      });
      res.status(200).json({ message: "User succesfully created" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default UserController;
