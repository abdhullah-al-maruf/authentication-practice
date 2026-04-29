import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// "mongodb://localhost:27017/database"  this url will come from database mongodb

const client = new MongoClient(process.env.MONGO_DB_URI); 
const db = client.db("user-auth-data");
export const auth = betterAuth({
  //... 
  database: mongodbAdapter(db,{client}),
  
    emailAndPassword: { 
    enabled: true, 
  }
});