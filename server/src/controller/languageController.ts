import { Request, Response } from "express";
import LanguageService from "@src/services/languageService";

class LanguageController {
  private languageService: LanguageService;

  constructor() {
    this.languageService = new LanguageService();
  }

  public getLanguages = async (req: Request, res: Response): Promise<void> => {
    try {
      const languages = await this.languageService.getLanguages();
      res.status(200).json(languages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
export default LanguageController;
