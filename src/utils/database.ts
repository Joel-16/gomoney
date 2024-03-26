import { mongoose } from "@typegoose/typegoose";
import { createClient } from "redis";

export async function databaseConnection() {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("database connected");
    return;
  } catch (error) {
    console.error(error);
  }
}

const redisClient = process.env.NODE_ENV === "production" ? createClient({url: `${process.env.REDISCLOUD_URL}`}) : createClient({})
redisClient.connect().catch((error)=>console.error(error)).then(()=> console.log("redis connected"))

export {redisClient}
