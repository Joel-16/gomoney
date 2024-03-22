import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { AdminService } from "../services";

@Service()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.adminService.login(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.adminService.register(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  
}
