import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { TeamService } from "../services";

@Service()
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.createTeam(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.getAllTeams(req.query);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.teamService.getTeam(id);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  editTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.teamService.editTeam(id, req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const result = await this.teamService.deleteTeam(id, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const text = req.query.text as string
      const result = await this.teamService.search(text, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };
}
