import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { FixtureService } from "../services";

@Service()
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.fixtureService.login(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.fixtureService.register(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  
}
