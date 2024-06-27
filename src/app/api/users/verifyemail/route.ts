import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


// DB Connection //
connectDB();

export async function POST(req:NextRequest){
    try {
        const {token}= await req.json();
        console.log(token);

        const user= await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error:"Invalid Token or Expiry Date!!!"}, {status:400})
        }
        user.isVerified= true,
        user.verifyToken= undefined
        user.verifyTokenExpiry= undefined

        await user.save();

        return NextResponse.json({message: "Email Verification Successful, Now you can Login", success:true}, {status:200})
        
    } 
    catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

