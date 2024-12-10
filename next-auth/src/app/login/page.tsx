"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";



const loginPage = () => {

    const router = useRouter()

    const [password, setpassword] = useState("");
    const [email,setemail] = useState("")

    const onLogin = async (e:any) => {
        
        try {
            e.preventDefault();

            const response = await axios.post("/api/user/login",{
                email,
                password
                
            })

            const data = response.data

            if(data.error){
                throw new Error(data.error)
            }
            
            toast.success(data.message)
            
            router.push("/")

              return data

        } catch (error:any) {
            console.log(error)
        }
    }

    return <div className="flex flex-col bg-white items-center justify-center p-8 h-screen w-full">

<form onSubmit={onLogin}>
     
        
     <div className=" pl-4 pr-8 py-4 items-center flex flex-col  gap-4 p-4 bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90">

     <h1 className="text-3xl font-mono font-semibold text-green-500 select-none">Login</h1>


     <div className="flex w-full flex-col gap-5 h-full mt-4">

  

 <div className="flex flex-col gap-1 items-start justify-center">
 <label className="text-xl text-gray-300 ml-2">Email</label>
 <input type="email" value={email} onChange={(e) => setemail( e.target.value)} className="px-3 py-2 border focus:border-none w-[300px] text-white border-none bg-black rounded-lg" placeholder="Enter Your email"/>
 </div>

 <div className="flex flex-col gap-1 items-start justify-center">
 <label className="text-xl text-gray-300 ml-2">Password</label>
 <input type="password" value={password} onChange={(e) => setpassword( e.target.value)} className="px-3 py-2 border focus:border-none w-[300px] text-white border-none bg-black rounded-lg" placeholder="Enter your password"/>
 </div>
     </div>
     
<div>
    <button className="bg-green-900 text-white px-16 py-2 rounded-md">Login</button>
</div>
<div className="">
    <Link href="/signup" className="text-gray-100 font-semibold text-lg hover:text-blue-600">Don't have an account ? Signup </Link>
</div>

     </div>
     </form>
     </div>
}

export default loginPage;