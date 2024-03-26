import { Fixture, Team } from './utils/models';
import { FixtureService, TeamService } from './utils/services';
import { mongoose } from '@typegoose/typegoose';

describe('Fixture Service', () => {
  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__);
  });

  afterEach(async () => {
    await Team.deleteMany({})
    await Fixture.deleteMany({});
  });


  it('should create a Fixture', async () => {
    const team= { name: 'testTeam1', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const team1= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team)
    const createdTeam1 = await TeamService.createTeam(team1)
    const createdFixture = await FixtureService.createFixture ({home: createdTeam._id, away: createdTeam1._id, time:"2024-04-20"});
    expect(createdFixture).toHaveProperty("_id")
    expect(createdFixture.status).toBe("pending");
  });

  it('should get all fixtures', async () => {
    const team= { name: 'testTeam1', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const team1= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team)
    const createdTeam1 = await TeamService.createTeam(team1)
    await FixtureService.createFixture ({home: createdTeam._id, away: createdTeam1._id, time:"2024-04-20"});
    const allFixtures = await FixtureService.getAllFixtures();
    expect(Array.isArray(allFixtures)).toBe(true);
    expect(allFixtures[0].venue).toBe(team.stadium);
  });

  it('should update a fixture', async () => {
    const team= { name: 'testTeam1', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const team1= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team)
    const createdTeam1 = await TeamService.createTeam(team1)
    const createdFixture = await FixtureService.createFixture ({home: createdTeam._id, away: createdTeam1._id, time:"2024-04-20"});
    const result = await FixtureService.editFixture(createdFixture._id.toString(), {time: "2023-04-20"});
    expect(result?.time?.toISOString().split("T")[0]).toBe( "2023-04-20");
  });

  it('should delete a fixture', async () => {
    const team= { name: 'testTeam1', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const team1= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team)
    const createdTeam1 = await TeamService.createTeam(team1)
    const createdFixture = await FixtureService.createFixture ({home: createdTeam._id, away: createdTeam1._id, time:"2024-04-20"});
    await FixtureService.deleteFixture(createdFixture._id.toString());
    const readFixture = await FixtureService.getFixture(createdFixture._id.toString());
    expect(Object.keys(readFixture).length).toBe(0);
  });
});
