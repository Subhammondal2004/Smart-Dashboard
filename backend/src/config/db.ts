import mongoose from "mongoose";

export const connectionDB = async() =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`); 
        console.log(`\nMongoDB connected!! DB host: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("Error while connecting to MongoDB", error);
        process.exit(1);
    }
}
