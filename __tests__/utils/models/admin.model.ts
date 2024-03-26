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


class Admin {
  @prop()
  firstname: string;

  @prop()
  lastname: string;

  @prop({ unique: true})
  email: string;

  @prop({ required: true, select: false })
  password: string;

  @prop()
  address: string;

}

const AdminModel = getModelForClass(Admin);
export { AdminModel as Admin };
