import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { TeamService } from "../services";

@Service()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.login(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.register(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  
}
