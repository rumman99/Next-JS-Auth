import mongoose, {Document} from "mongoose";

interface UserDocument extends Document {
    username: string;
    email: string;
    fullName: string;
    password: string;
    isVerified: boolean;
    isAdmin: boolean;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}

const userSchema= new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        required: [true, "Username Can't be Empty"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email Can't be Empty"],
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    }
})

export const User= mongoose.models.users || mongoose.model<UserDocument>('users', userSchema);