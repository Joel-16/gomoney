import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        const link = process.env.NODE_ENV === "production" ? `${process.env.DOMAIN}/link/${ret.link}` : `http://localhost:3000/link/${ret.link}`
        ret.link = link
        return link
      }
    }
  }
})

class Fixture {
  @prop()
  home: string;

  @prop()
  away: string;

  @prop()
  venue: string;

  @prop()
  time: Date

  @prop({default:{home: 0, away: 0}})
  score: {
    home: number;
    away: number
  }

  @prop({default: "pending"})
  status: string;

  @prop({default: nanoid(15)})
  link: string
  
}

const FixtureModel = getModelForClass(Fixture);
export { FixtureModel as Fixture };
