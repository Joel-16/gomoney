import { getModelForClass, prop } from "@typegoose/typegoose";

class Team {
  @prop()
  name: string;

  @prop()
  code_name: string;

  @prop()
  description: string;

  @prop()
  stadium: string;

  @prop()
  coach: string;

}

const TeamModel = getModelForClass(Team);
export { TeamModel as Team };
