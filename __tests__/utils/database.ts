import { mongoose } from "@typegoose/typegoose";
// import { createClient } from "redis";

export async function databaseConnection() {
  try {
    console.log(process.env.DATABASE_URL)
    await mongoose.connect(`${process.env.TEST_DATABASE}`);
    console.log("database connected");
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function disconnectDatabase(){
  await mongoose.disconnect()
}
// let redisClient = createClient()
// redisClient.connect().catch((error)=>console.error(error)).then(()=> console.log("redis connected"))

// export {redisClient}
