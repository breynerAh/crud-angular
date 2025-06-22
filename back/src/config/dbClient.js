import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDb = async () => {
  try {
    await client.connect();
    return client.db();
  } catch (error) {
    return console.error("Conexión fallida:", error);
  }
};

export { connectDb };
