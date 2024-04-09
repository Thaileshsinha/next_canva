import mongoose, { Mongoose } from "mongoose";

const MONGOOSE_URL = process.env.MONGOOSE_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGOOSE_URL) throw new Error("missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGOOSE_URL, {
      dbName: "canvaAI",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
};
