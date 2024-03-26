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

class Team {
  @prop()
  name: string;

  @prop()
  code_name: string;

  @prop()
  stadium: string;

  @prop()
  coach: string;

}

const TeamModel = getModelForClass(Team);
export { TeamModel as Team };
