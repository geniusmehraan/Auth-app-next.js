"use client"

import axios from "axios"
import { useEffect, useState } from "react"

 
  
  
 


const current = () => {

  const [user, setUser] = useState<any>(null)

  const getUser = async ()=>{
    const response = await axios.get("/api/user/getUser")
    const data = response.data
    setUser(data)
  }

  useEffect(()=>{
    getUser()
  },[])
  
  return (
    <div className="flex flex-col  h-screen w-full bg-slate-300">
      <div className="w-full flex items-center justify-between px-10 h-[60px] bg-lime-400">
         <h1 className="font-bold text-xl">{user?.username}</h1>
         <input type="text" placeholder="search for users" className="w-[300px] p-[6px] px-2 text-lg font-mono rounded-md bg-black text-white outline-none focus:outline-2 focus:outline-offset-2 focus:outline-gray-700"/>
         <img src="/favi.png" alt="" className="w-10 h-10 rounded-full"/>
      </div>
    </div>
  )
}

export default current
