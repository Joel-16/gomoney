import { getModelForClass, prop } from "@typegoose/typegoose";

class Account {
  @prop()
  firstname: string;

  @prop()
  lastname: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, select: false })
  password: string;

  @prop()
  address: string;

}

const AccountModel = getModelForClass(Account);
export { AccountModel as Account };
