import { NextFunction } from "express";
import { Service } from "typedi";

import { redisClient } from "../utils/database";
import { Fixture, Team } from "../models";
import { CustomError } from "../utils/response/custom-error/CustomError";
import { TeamDto } from "../types";

@Service()
export class TeamService {
  constructor(
    private readonly team = Team,
    private readonly fixture= Fixture
  ) {}

  async createTeam(payload: TeamDto, next: NextFunction) {
    const status = await this.team.findOne({ $or: [{ name: payload.name }, { code_name: payload.code_name }] });
    if (status) {
      next(new CustomError(401, "Name or Code name already associated with a team"));
    }
    const team = await this.team.create({
      name: payload.name,
      code_name: payload.code_name,
      stadium: payload.stadium,
      coach: payload.coach
    });
    return team;
  }

  async getAllTeams(query?:any) {
    const teams = await this.team.find(query);
    await redisClient.set("/teams", JSON.stringify(teams), {EX: 180})
    return teams
  }

  async getTeam(id: string): Promise<TeamDto> {
    const team = await this.team.findById(id );
    return team
  }

  async editTeam(id: string, payload: Partial<TeamDto>, next: NextFunction):Promise<TeamDto> {
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
        name: payload.name,
        code_name: payload.code_name,
        stadium: payload.stadium,
        coach: payload.coach,
      }
    );
    return await this.team.findById(id);
  }

  async deleteTeam(id: string, next: NextFunction) {
    let team = await this.team.findById(id);
    if (!team) {
      next(new CustomError(400, "team doesn't exist, Please select a valid team"));
    }

    await this.team.deleteOne({_id:id})
    return {message: "Team deleted successfully"};
  }

  async search(text: string, next: NextFunction) {
    const team = await this.team.findOne({$or:[{name: text}, {coach: text}, {code_name: text}, {stadium: text}]});
    if(!team){
      next(new CustomError(400, "No team or fixture matches the text you entered"));
    }
    const [pendingFixtures, completedFixtures]= await Promise.all([
      this.fixture.find({status: "pending", $or:[{home: team.id}, {away: team.id}]}),
      this.fixture.find({status: "completed",  $or:[{home: team.id}, {away: team.id}]})
    ])
    return{
      team,
      pendingFixtures,
      completedFixtures
    }
  }
}
