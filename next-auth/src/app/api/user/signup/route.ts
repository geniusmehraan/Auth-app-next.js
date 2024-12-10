import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDB from "@/dbConfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Input Validation
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing username, email, or password" }, { status: 400 });
    }

    // Check for existing user with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Check for existing user with the same username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, isVerified: newUser.isVerified },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Create a response with user data
    const response = NextResponse.json({
      username: newUser.username,
      email: newUser.email,
    });

    // Set the JWT token in a secure HTTP-only cookie
    response.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 ,path: "/"}); 

    return response;
  } catch (error: any) {
    console.error("Error during signup:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}