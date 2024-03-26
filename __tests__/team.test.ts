import { Team } from './utils/models';
import { TeamService } from './utils/services';
import { mongoose } from '@typegoose/typegoose';

describe('Team Service', () => {
  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__);
  });

  afterEach(async () => {
    await Team.deleteMany({});
  });


  it('should create a team', async () => {
    const team= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam (team);
    expect(createdTeam).toHaveProperty("_id")
    expect(createdTeam.name).toBe(team.name)
  });

  it('should get all team', async () => {
    const team= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    await TeamService.createTeam (team);
    const allTeam = await TeamService.findAllTeams();
    expect(Array.isArray(allTeam)).toBe(true);
  });

  it('should update a team', async () => {
    const team= { name: 'testTeam1', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team);
    const result = await TeamService.updateTeam(createdTeam._id.toString(), {coach: "mourinho"});
    expect(result?.coach).toBe("mourinho");
  });

  it('should delete a team', async () => {
    const team= { name: 'testTeam2', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team);
    await TeamService.delete(createdTeam._id.toString());
    const readTeam = await TeamService.findTeam(createdTeam._id.toString());
    expect(readTeam).toBeNull();
  });
});
