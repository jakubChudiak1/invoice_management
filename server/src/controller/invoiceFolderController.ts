import { Request, Response } from "express";
import InvoiceFolderService from "@src/services/invoiceFolderService";

class InvoiceFolderController {
  private invoiceFolderService: InvoiceFolderService;

  constructor() {
    this.invoiceFolderService = new InvoiceFolderService();
  }

  public getUsersFolders = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (req.session.user_id !== undefined) {
        const usersFolders = await this.invoiceFolderService.getUsersFolders(
          req.session.user_id
        );
        res.status(200).json(usersFolders);
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUsersFolderById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { folder_id } = req.params;
      if (req.session.user_id !== undefined) {
        const usersFolder = await this.invoiceFolderService.getUsersFolderById(
          req.session.user_id,
          +folder_id
        );
        res.status(200).json(usersFolder);
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createFolder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { created_at, name, root_folder } = req.body;
      if (req.session.user_id !== undefined) {
        const usersFolder = await this.invoiceFolderService.createFolder(
          req.session.user_id,
          name,
          created_at,
          root_folder
        );
        res.status(200).json({ message: "Folder succesfully created!" });
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };

  public changeFoldersName = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name } = req.body;
      const { folder_id } = req.params;
      if (req.session.user_id !== undefined) {
        const newNameFolder = await this.invoiceFolderService.changeFoldersName(
          req.session.user_id,
          +folder_id,
          name
        );
        res.status(200).json({ message: "Name succesfully changed!" });
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };

  public deleteFolder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { folder_id } = req.params;
      if (req.session.user_id !== undefined) {
        const deletedFolder = await this.invoiceFolderService.deleteFolder(
          req.session.user_id,
          +folder_id
        );
        res.status(200).json({ message: "Folder succesfully deleted!" });
      } else {
        res.status(400).json({ message: "Unathorized!" });
      }
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  };
}
export default InvoiceFolderController;
