import { connectDB } from "@/dbConfig/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/utils/mailer";

interface UserInterface{
    username: string,
    email: string,
    fullName: string,
    password: string
}

// DB Connection //
connectDB();

export const POST = async(req: NextRequest)=>{
    try {
        const {username, email, password, fullName}:UserInterface = await req.json();

        console.log(username, email, fullName);

        const user= await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User Already Exist"}, {status: 400})
        }

    // Encrypting Password //
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser= new User({
            username,
            email,
            fullName,
            password: hash
        })

        const savedUser= await newUser.save();

    // Verification Email //
        await sendMail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({message: "User Registered Successfully", success: true, savedUser});
    } 
    catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}