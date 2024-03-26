import { Admin } from '../src/models';
import { databaseConnection, disconnectDatabase} from './utils/database';
import { AdminService } from './utils/services';

describe('Admin Service', () => {
  beforeAll(async () => {
    await databaseConnection;
  }, 2000000);

  afterEach(async () => {
    await Admin.deleteMany({})
  }, 2000000);
  afterAll(async () => {
    await disconnectDatabase();
  }, 2000000);

  it('should create an admin account', async () => {
    const admin= { firstname: 'testAdmin1', lastname: "tt1", email:"testCoach", password: "test stadium", address: "" };
    const createdAdmin = await AdminService.register(admin)
    expect(createdAdmin).toHaveProperty("_id")
    expect(createdAdmin.firstname).toBe(admin.firstname);
  }, 2000000);

  it('an admin account should login', async () => {
    const admin= { firstname: 'testAdmin1', lastname: "tt1", email:"testCoach", password: "test stadium", address: "" };
    await AdminService.register(admin);
    const authenticatedAdmin = await AdminService.login({email: admin.email, password: admin.password})
    expect(authenticatedAdmin).toHaveProperty("token")    
  }, 2000000);

});
