import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import User from "./models/user.model";

export const middleware = async (request: NextRequest) => {
  const baseUrl = request.nextUrl.origin;
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";
  
};

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail"],
};