import nodemailer from "nodemailer";
import { generateToken } from "./generateToken";
import bcrypt from "bcryptjs";

interface MailType{
    email: string,
    emailType: string,
    userId: string
}

export const sendMail= async({email, emailType, userId}:MailType)=> {
    try {
        // hashing for verify token //
        const hashedToken= await bcrypt.hash(userId.toString(), 10)
        await generateToken(emailType, userId, hashedToken);

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const mailOption= {
            from: '', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Password", // Subject line
            // text: "Hello world?", // plain text body
            html: `<p> <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>Click Here</a> to ${emailType==="VERIFY" ? "Verify Your Email" : "Reset Your Password"}
            or copy and paste the link in your browser address bar <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailResponse= await transport.sendMail(mailOption)
        return mailResponse;
    } 
    catch (error:any) {
        throw new Error(error.message);
    }
}