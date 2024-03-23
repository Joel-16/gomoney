import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { TeamService } from "../services";

@Service()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

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
      const result = await this.teamService.getAllTeams(req.body);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  getTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.getTeam(req.body);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  editTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
      const result = await this.teamService.editTeam(id, req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };
  
  deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.deleteTeam(req.body, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const text = req.query.text as string
      const result = await this.teamService.deleteTeam(text, next);
      res.customSuccess(200, result);
    } catch {
      next();
    }
  };
}
