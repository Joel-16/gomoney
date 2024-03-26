import { NextFunction } from "express";
import { Service } from "typedi";

import { redisClient } from "../utils/database";
import { Fixture, Team } from "../models";
import { CustomError } from "../utils/response/custom-error/CustomError";
import { FixtureDto } from "../types";

@Service()
export class FixtureService {
  constructor(  
    private readonly fixture = Fixture,
    private readonly team= Team
  ) { }

  async createFixture(payload: FixtureDto, next: NextFunction) {

    if(payload.home === payload.away){
      next(new CustomError(401, "A team cannot play itself"));
    }

    const [home, away] = await Promise.all([
      this.team.findById(payload.home),
      this.team.findById(payload.away)
    ])

    if (!home || !away) {
      next(new CustomError(401, "One of the teams selected do not exist"));
    }

    const fixture = await this.fixture.create({
      home: payload.home,
      away: payload.away,
      venue: home.stadium,
      time: payload.time
    });
    return {...fixture.toJSON(), home, away};
  }

  async getAllFixtures(query) {
    let fixtures = await this.fixture.find(
      {
        ...query,
      }
    );
    const parsedfixtures= await Promise.all(fixtures.map(async(fixture)=>{
      const [home, away] = await Promise.all([
        this.team.findById(fixture.home),
        this.team.findById(fixture.away)
      ]) 
      return {...fixture.toJSON(), home, away};
    }))
    await redisClient.set("/fixtures", JSON.stringify(parsedfixtures), {EX: 180})
    return parsedfixtures
  }

  async getFixture(id: string) {
    const fixture = await this.fixture.findById(id);
    const [home, away] = await Promise.all([
      this.team.findById(fixture.home),
      this.team.findById(fixture.away)
    ])
    return {...fixture.toJSON(), home, away};
  }

  async editFixture(id: string, payload, next: NextFunction) {
    let fixture = await this.fixture.findOne({ _id: id });
    if (!fixture) {
      next(new CustomError(400, "fixture doesn't exist, Select a valid fixture"));
    }

    let home
    if(payload.home){ 
       home = await this.team.findById(payload.home)
      if (!home) next(new CustomError(400, "home team doesn't exist, Select a valid team"));
    }

    if(payload.away){ 
      const away = await this.team.findById(payload.away)
      if (!away) next(new CustomError(400, "away team doesn't exist, Select a valid team"));
    }

    await this.fixture.updateOne(
      { _id: id },
      {
        home: payload.home,
        away: payload.away,
        time: payload.time,
        score: payload.score,
        venue: home?.stadium || fixture.venue
      }
    );
    fixture = await this.fixture.findById(id);
    const [homeTeam, away] = await Promise.all([
      this.team.findById(fixture.home),
      this.team.findById(fixture.away)
    ])
    return {...fixture.toJSON(), home: homeTeam, away};
  }

  async deleteFixture(id: string, next: NextFunction) {
    let fixture = await this.fixture.findById(id);
    if (!fixture) {
      next(new CustomError(400, "fixture doesn't exist, Please selecta a valid fixture"));
    }

    await this.fixture.deleteOne({ _id: id })
    return { message: "fixture deleted successfully" };
  }

  async link(id: string) {
    const fixture = await this.fixture.findOne({ link: id });
    return fixture
  }

}
