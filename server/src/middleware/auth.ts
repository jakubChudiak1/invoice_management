import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user_id !== undefined) {
    next();
  } else {
    res.status(400).json({ message: "Unathorized" });
  }
};
