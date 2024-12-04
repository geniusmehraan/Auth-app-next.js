import bcrypt from "bcryptjs"
import User from "@/models/user.model"
import jwt from "jsonwebtoken"
import { NextRequest,NextResponse } from "next/server"
import connectToDB from "@/dbConfig/dbconfig"
connectToDB()
export async function POST(request: NextRequest){
   const {email,password} = await request.json()

   const user = await User.findOne({email})
   
   if(!user) return NextResponse.json({message: "User not found"},{status: 200})


    const isvalidpassword = await bcrypt.compare(password,user?.password)

    if(!isvalidpassword) return NextResponse.json({error: "Invalid password"})

        const token = jwt.sign({
            id:user?._id
        },process.env.JWT_SECRET,{expiresIn: "1d"})

        const response = NextResponse.json({message:"logged in succesfuly"})

        response.cookies.set("token",token,{httpOnly: true,maxAge:60*60*24})
    
        return response
        
}