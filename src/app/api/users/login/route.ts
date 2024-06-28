import bcrypt from 'bcryptjs';
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// DB Connection //
connectDB();

const POST= async(req: NextRequest)=>{
    const {email, password}= await req.json();

    //  TODO NEED FIELD VALIDATION

    try{
        const user= await User.findOne({email, isVerified:true});

        if(!user){
            return NextResponse.json({error: "Invalid Email or Password!!!"}, {status:500})
        }

        const verifyPassword= bcrypt.compare(password, user.password);

        if(!verifyPassword){
            return NextResponse.json({error: "Invalid Email or Password!!!"}, {status:500})
        }

        const jwtData= {id:user._id, email:user.email}

        const jwtToken= jwt.sign(jwtData, process.env.TOKEN_SECRET!, {expiresIn:"1d"})

        const {password, ...userWithoutPassword}= user;

        const response= NextResponse.json({message: "", success:true, user:userWithoutPassword});

        response.cookies.set('token', jwtToken, {httpOnly:true, secure:true})

        return response;
    
    }
    catch(err:any){
        return NextResponse.json({error: err.message}, {status:500})
    }
}

export default POST;