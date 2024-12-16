import { NextRequest, NextResponse } from "next/server"


import connectToDB from "./dbConfig/dbconfig"
import callGetUser from "./helpers/callGetUser"
import { NextURL } from "next/dist/server/web/next-url"


connectToDB()

export const middleware = async(request:NextRequest) => {

  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail"

  const token = request.cookies.get("token")?.value
  
  const data = await callGetUser(token)

  console.log(data)

  if(data){
    
    if(data.error&&!isPublicPath){
      return NextResponse.redirect(new URL("/login",request.nextUrl.origin))
    }    
   if(!data?.verified&&!isPublicPath){
    return NextResponse.redirect(new URL("/verifyemail",request.nextUrl.origin))
   }
   
   if(isPublicPath&&data?.verified&&isPublicPath){
    return NextResponse.redirect(new URL("/",request.nextUrl.origin))
  }
  if(!isPublicPath&&!data?.verified){
    return NextResponse.redirect(new URL("/verifyemail",request.nextUrl.origin))
  }
  }
 

  
 
}

export const config = {
    matcher:[
        "/",
        "/login",
        "/signup",
        "/verifyemail"
    ]
}