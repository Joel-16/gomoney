import { NextFunction } from "express";
import { Service } from "typedi";

import { Team } from "../models";
import { CustomError } from "../utils/response/custom-error/CustomError";

@Service()
export class TeamService {
  constructor(
    private readonly team = Team
  ) {}

  async createTeam(payload, next: NextFunction) {
    const status = await this.team.findOne({ $or: [{ name: payload.name }, { code_name: payload.code_name }] });
    if (status) {
      next(new CustomError(401, "Name or Code name already associated with a team"));
    }
    const team = await this.team.create({
      name: payload.name,
      code_name: payload.code_name,
      description: payload.description,
      stadium: payload.stadium,
      coach: payload.coach
    });
    return team;
  }

  async getAllTeams(query) {
    const teams = await this.team.find(query);
    return teams
  }

  async getTeam(id: string) {
    const team = await this.team.findById(id );
    return team
  }

  async editTeam(id: string, payload, next: NextFunction) {
    let team = await this.team.findOne({ _id: id });
    if (!team) {
      next(new CustomError(400, "team doesn't exist, Select a valid team"));
    }

    const status = await this.team.findOne({ $or: [{ name: payload.name }, { code_name: payload.code_name }] });
    if (status) {
      next(new CustomError(401, "Name or Code name already associated with a team"));
    }

    await this.team.updateOne(
      { _id: id },
      {
        name: payload.home,
        code_name: payload.code_name,
        description: payload.description,
        stadium: payload.stadium,
        coach: payload,
      }
    );
    return await this.team.findById(id);
  }

  async deleteTeam(id: string, next: NextFunction) {
    let team = await this.team.findById(id);
    if (!team) {
      next(new CustomError(400, "team doesn't exist, Please select a valid team"));
    }

    return team;
  }
}
