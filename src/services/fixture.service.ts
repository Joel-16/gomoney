import { NextFunction } from "express";
import { Service } from "typedi";

import { Fixture } from "../models";
import {TeamService} from "../services"
import { CustomError } from "../utils/response/custom-error/CustomError";

@Service()
export class FixtureService {
  constructor(
    private readonly fixture = Fixture,
    private readonly teamService :TeamService
  ) {}

  async createFixture(payload, next: NextFunction) {

    const [home, away ] = await Promise.all([
      this.teamService.getTeam(payload.home),
      this.teamService.getTeam(payload.away)
    ])
    
    if (!home || !away ) {
      next(new CustomError(401, "One of the teams selected do not exist"));
    }

    const fixture = await this.fixture.create({
      home: payload.home,
      away: payload.away,
      venue: home.stadium,
      time: payload.time
    });
    return fixture;
  }

  async getAllFixtures(query) {
    const fixtures = await this.fixture.find(
      {
        ...query,
      }
    );

    return fixtures
  }

  async getFixture(id: string) {
    const fixture = await this.fixture.findById(id );
    return fixture
  }

  async editFixture(id: string, payload, next: NextFunction) {
    let fixture = await this.fixture.findOne({ _id: id });
    if (!fixture) {
      next(new CustomError(400, "fixture doesn't exist, Select a valid fixture"));
    }

    const home = payload.home && await this.teamService.getTeam(payload.home)
    const away = payload.away && await this.teamService.getTeam(payload.away)
    
    if (!home || !away ) {
      next(new CustomError(401, "One of the teams selected do not exist"));
    }

    await this.fixture.updateOne(
      { _id: id },
      {
        home,
        away,
        time: payload.time,
        score: payload.score,
        venue: home?.stadium || fixture.venue
      }
    );
    return await this.fixture.findById(id);
  }

  async deleteFixture(id: string, next: NextFunction) {
    let fixture = await this.fixture.findById(id);
    if (!fixture) {
      next(new CustomError(400, "fixture doesn't exist, Please Sign in again"));
    }

    return fixture;
  }
}
