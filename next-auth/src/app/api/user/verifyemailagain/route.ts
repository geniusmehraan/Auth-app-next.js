import { NextRequest,NextResponse } from "next/server"

import { sendEmail } from "@/helpers/mailer"
import User from "@/models/user.model"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import connectToDB from "@/dbConfig/dbconfig"

connectToDB()

export async function GET(request:NextRequest){
    const userId = await getDataFromToken(request)

    
    
    const user = await User.findById(userId)

    if(!user) return NextResponse.json({error:"user not found"},{status:200})

 if(user.isVerified) return NextResponse.json({error:"email already verified"},{status:200})

    sendEmail({email:user.email,emailType:"VERIFY",userId:user._id})

    return NextResponse.json({message:"email sent"},{status:200})
}