import { Team } from '../src/models';
import { databaseConnection, disconnectDatabase} from './utils/database';
import { TeamService } from './utils/services';

describe('Team Service', () => {
  beforeAll(async () => {
    await databaseConnection;
  });

  afterEach(async () => {
    await Team.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it('should create a team', async () => {
    const team= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam (team);
    expect(createdTeam).toContain(team)
  });

  it('should get all team', async () => {
    const team= { name: 'testTeam', code_name: "tt", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam (team);
    const allTeam = await TeamService.findAllTeams();
    expect(Array.isArray(allTeam)).toBe(true);
  });

  it('should update a team', async () => {
    const team= { name: 'testTeam1', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team);
    const updatedTeam = { ...createdTeam, completed: true };
    const result = await TeamService.updateTeam(createdTeam._id.toString(), updatedTeam);
    expect(result).toBe(true);
  });

  it('should delete a team', async () => {
    const team= { name: 'testTeam2', code_name: "tt1", coach:"testCoach", stadium: "test stadium" };
    const createdTeam = await TeamService.createTeam(team);
    const result = await TeamService.delete(createdTeam._id.toString());
    expect(result).toBe(true);
    const readTeam = await TeamService.findTeam(createdTeam._id.toString());
    expect(readTeam).toBeNull();
  });
});
