import { mongoose } from "@typegoose/typegoose";

export async function databaseConnection() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("database connected");
    return;
  } catch (error) {
    console.error(error);
  }
}
