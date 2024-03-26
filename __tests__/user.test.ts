import { Account } from './utils/models';
import { AccountService } from './utils/services';
import { mongoose } from '@typegoose/typegoose';

describe('User Service', () => {
  beforeAll(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__);
  });

  afterEach(async () => {
    await Account.deleteMany({})
  });


  it('should create a user account', async () => {
    const admin= { firstname: 'testAdmin1', lastname: "tt1", email:"testCoach", password: "test stadium", address: "" };
    const createdAdmin = await AccountService.register(admin)
    expect(createdAdmin).toHaveProperty("_id")
    expect(createdAdmin.firstname).toBe(admin.firstname);
  });

  it('a user account should login', async () => {
    const admin= { firstname: 'testAdmin1', lastname: "tt1", email:"testCoach", password: "test stadium", address: "" };
    await AccountService.register(admin);
    const authenticatedAdmin = await AccountService.login({email: admin.email, password: admin.password})
    expect(authenticatedAdmin).toHaveProperty("token")    
  });

});
