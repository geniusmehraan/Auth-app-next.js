"use client"
import { useEffect , useState} from "react";

import Link from "next/link";

import axios from "axios";

const verifyEmail = () => {

    const [isVerified, setIsVerified] = useState(false);

    const [token, setToken] = useState("");

    const verifyUserEmail = async () => {
        try {
             await fetch("/api/user/verifyemail",{
                headers:{
                    "Content-type":"application/json"
                },
                method:"POST",
                body:JSON.stringify(token)
             });
             
            setIsVerified(true);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyEmailAgain = async () => {

        await axios.get("/api/user/verifyemailagain");
        
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(token)
        setToken(urlToken);
    },[]);

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token]);

    return (
        <div>
            <h1>{isVerified ? "Email verified successfully" : "Verifying..."}</h1>
            <Link href="/">go to home page</Link>

            {!isVerified ? <button onClick={()=>verifyEmailAgain()} className="text-blue-500 text-xl select-none cursor-pointer">  verify email again</button>:"Email verified successfully"}
        </div>
    );
}

export default verifyEmail;
