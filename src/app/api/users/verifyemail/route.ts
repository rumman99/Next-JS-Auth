import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


// DB Connection //
connectDB();

export async function POST(req:NextRequest){
    try {
        
    } 
    catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

