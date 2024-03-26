import { mongoose } from "@typegoose/typegoose";
// import { createClient } from "redis";

export async function databaseConnection() {
    console.log(process.env.DATABASE_URL)
    mongoose.connect(`${process.env.TEST_DATABASE}`)
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    return;

}

export async function disconnectDatabase(){
  await mongoose.disconnect()
}
// let redisClient = createClient()
// redisClient.connect().catch((error)=>console.error(error)).then(()=> console.log("redis connected"))

// export {redisClient}
