import { Request, Response } from "express";
import FileService from "@src/services/fileService";

class FileController {
  private fileService: FileService;

  constructor() {
    this.fileService = new FileService();
  }

  public getInvoicesFiles = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { invoice_id } = req.params;
      const invoicesFiles = await this.fileService.getInvoicesFiles(
        +invoice_id
      );
      res.status(200).json(invoicesFiles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public getFileById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { file_id } = req.params;
      const file = await this.fileService.getFileById(+file_id);
      res.status(200).json(file);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public createFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { invoice_id, path } = req.body;
      const newInvoice = await this.fileService.createFile(invoice_id, path);
      res.status(200).json({ message: "Success" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public deleteFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { file_id } = req.params;
      const deletedFile = await this.fileService.deleteFile(+file_id);
      res.status(200).json({ message: "Success" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default FileController;
