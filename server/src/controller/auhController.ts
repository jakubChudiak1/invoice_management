import { Response, Request } from "express";
import bcrypt from "bcrypt";
import UserService from "@src/services/userService";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUsersData = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.session.user_id !== undefined) {
        const user = await this.userService.getUserById(req.session.user_id);
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Unathorized" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  };

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, first_name, surname, password } = req.body;
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser = await this.userService.createUser({
        email: email,
        first_name: first_name,
        surname: surname,
        password: hashedPassword,
      });
      res.status(200).json({ message: "User was signed up successfuly" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  };

  public signIn = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const existingUser = await this.userService.getUserByEmail(email);
      if (!existingUser) {
        res.status(400).json({ message: "Incorrect credentials" });
      } else {
        const isMatching = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (isMatching) {
          req.session.regenerate(() => {
            req.session.user_id = existingUser?.user_id;
            req.session.save();
            res.status(200).json({ message: "User logged in successfuly" });
          });
        } else {
          res.status(400).json({ message: "Incorrect credentials" });
        }
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public signOut = async (req: Request, res: Response): Promise<void> => {
    try {
      req.session.user_id = null as any;
      req.session.save((err) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        }
        req.session.regenerate(function (err) {
          if (err) {
            res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(200).json({ message: "Sign-out successful" });
        });
      });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  };

  public verifyUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user_id } = req.body;
      const verifiedUser = await this.userService.verifyUser(user_id, true);
      res.status(200).json({ message: "User is verified" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  };
}
export default AuthController;
