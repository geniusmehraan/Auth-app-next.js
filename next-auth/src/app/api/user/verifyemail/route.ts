import connectToDB from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
    try {
        const token = await request.json();
 const user = await User.findOne({verifyToken:token,verfifyTokenExpiry:{$gt:Date.now()}});

 if(!user) return NextResponse.json({error:"Invalid token"},{status:400});

 user.isVerified = true;
 user.verifyToken = undefined;
 user.verifyTokenExpiry = undefined;

 await user.save();

 return NextResponse.json({message:"Email verified successfully"},{status:200});

    
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500});
    }
}