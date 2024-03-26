import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { FixtureService } from "../services";
import { CustomError } from "../utils/response/custom-error/CustomError";

@Service()
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) { }

  createFixture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.fixtureService.createFixture(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getAllFixtures = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if(req.query.status && !["pending", "completed"].includes(req.query.status as string)) next(new CustomError(400, "Unsurpported query value"))
      const result = await this.fixtureService.getAllFixtures(req.query);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getFixture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.fixtureService.getFixture(id);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  editFixture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.fixtureService.editFixture(id, req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  deleteFixture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.fixtureService.deleteFixture(id, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  link = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const result = await this.fixtureService.link(id);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };
}
