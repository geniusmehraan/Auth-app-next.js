import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDB from "@/dbConfig/dbconfig";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({error: "User already exists" },{status:400});
    }

    
    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return NextResponse.json(
        { error: "username already exists" },
        { status: 409 }
      );
    }

    
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

   
    const token = jwt.sign(
      { id: newUser._id},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    
    const response = NextResponse.json({
      username:newUser.username,
      email:newUser.email
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, 
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: "server has problem" }, {status:500}
    );
  }
}
