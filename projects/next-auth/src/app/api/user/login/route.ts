import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDB from "@/dbConfig/dbconfig";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Input Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, isVerified: user.isVerified },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Create a response with user data
    const response = NextResponse.json({
      message:"user logged succesfully"
    });

    // Set the JWT token in a secure HTTP-only cookie
    response.cookies.set("token", token, { httpOnly: true,  maxAge: 60 * 60 * 24 ,path: "/"}); 
   
    return response;
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}