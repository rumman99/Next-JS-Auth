import mongoose from "mongoose";

export const connectDB= async()=>{
    try{
        const connection= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("MongoDB Connected :)", connection.connection.host)

        connection.connection.on("Connected", ()=> {
            console.log("MongoDB Connected")
        })

        connection.connection.on('error', (err)=> {
            console.log("Connection Error in MONGODB"+ err);
            process.exit();
        })
    }
    catch(err){
        console.log("MongoDB Connection Failed!!!", err);
        process.exit();
    }
}