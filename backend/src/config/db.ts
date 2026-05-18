import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectionDB = async() =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`); 
        console.log(`\nMongoDB connected!! DB host: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Error while connecting to MongoDB", error);
        process.exit(1);
    }
}
