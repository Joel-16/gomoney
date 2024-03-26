import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      }
    }
  }
})

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
