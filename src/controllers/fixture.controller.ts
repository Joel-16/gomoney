import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { FixtureService } from "../services";

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
      const result = await this.fixtureService.getAllFixtures(req.body);
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
