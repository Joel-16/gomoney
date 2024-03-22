import { getModelForClass, prop } from "@typegoose/typegoose";

class Admin {
  @prop()
  firstname: string;

  @prop()
  lastnam: string;

  @prop({ unique: true})
  email: string;

  @prop({ required: true, select: false })
  password: string;

  @prop()
  address: string;

}

const AdminModel = getModelForClass(Admin);
export { AdminModel as Admin };
