import next from "next";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request:NextRequest)=>{
    const path = request.nextUrl.pathname
  const isPublicPath = path==="/login"||path==="/signup"

  const token = request.cookies.get("token")?.value||""

  if(!token&&!isPublicPath){
    return NextResponse.redirect(new URL("/login",request.nextUrl))
  }
  if(token&&isPublicPath){
    return NextResponse.redirect(new URL("/",request.nextUrl))
  }
 
  
}

export const config = {
    matcher:[
        "/",
        "/login",
        "/signup"
    ]
}