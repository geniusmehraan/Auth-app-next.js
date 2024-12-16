import connectToDB from "@/dbConfig/dbconfig";
import getDataFromToken from "@/helpers/getDataFromToken";

import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connectToDB()

export async function POST(request:NextRequest){

    const othertoken = await request.json()

    if (typeof othertoken == null) {
        return NextResponse.json({error: "User not found"})
    }

    let token =  request.cookies.get("token")?.value;

    if (typeof token === "undefined") {
        token = othertoken;
    }

    if(!token){
        return NextResponse.json({error: "User not found"})
    }

    const userId = await getDataFromToken(token)

    if(!userId) return NextResponse.json({error: "User not found"})

    const user = await User.findById(userId)
    
    return NextResponse.json({username: user?.username, email: user?.email, verified: user?.isVerified, id: user?._id})
}
