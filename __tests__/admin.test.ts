import { mongoose } from "@typegoose/typegoose";
import { Admin } from './utils/models';
import { AdminService } from './utils/services';

describe('Admin Service', () => {
  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__);
  });

  afterEach(async () => {
    await Admin.deleteMany({})
  });


  it('should create an admin account', async () => {
    const admin= { firstname: 'testAdmin1', lastname: "tt1", email:"testCoach", password: "test stadium", address: "" };
    const createdAdmin = await AdminService.register(admin)
    expect(createdAdmin).toHaveProperty("_id")
    expect(createdAdmin.firstname).toBe(admin.firstname);
  });

  it('an admin account should login', async () => {
    const admin= { firstname: 'testAdmin1', lastname: "tt1", email:"testCoach", password: "test stadium", address: "" };
    await AdminService.register(admin);
    const authenticatedAdmin = await AdminService.login({email: admin.email, password: admin.password})
    expect(authenticatedAdmin).toHaveProperty("token")    
  });

});
