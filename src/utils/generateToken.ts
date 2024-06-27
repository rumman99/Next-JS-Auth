import { User } from "@/models/user.model"

// hashing for Verify Token //
export const generateToken= async(emailType:any, userId:any, hashedToken:any)=>{

    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, 
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+3600000})
    }
    else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId, 
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()+3600000})
    }
}