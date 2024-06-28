import bcrypt from 'bcryptjs';
import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// DB Connection //
connectDB();

const POST= async(req: NextRequest)=>{
    try{
    //  TODO NEED FIELD VALIDATION

    const {email, password:userPassword}= await req.json();

        const user= await User.findOne({email, isVerified:true});

        if(!user){
            return NextResponse.json({error: "Invalid Email or Password!!!"}, {status:500})
        }

        const verifyPassword= bcrypt.compare(userPassword, user.password);

        if(!verifyPassword){
            return NextResponse.json({error: "Invalid Email or Password!!!"}, {status:500})
        }

        const jwtData= {id:user._id, email:user.email}

        const jwtToken= jwt.sign(jwtData, process.env.TOKEN_SECRET!, {expiresIn:"1d"})

        const {password, ...userWithoutPassword}= user;

        const response= NextResponse.json({message: "Login Successful", success:true, user:userWithoutPassword}, {status:200});

        response.cookies.set('token', jwtToken, {httpOnly:true, secure:true})

        return response;
    
    }
    catch(err:any){
        return NextResponse.json({error: err.message}, {status:500})
    }
}

export default POST;