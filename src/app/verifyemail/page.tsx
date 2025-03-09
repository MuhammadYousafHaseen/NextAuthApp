'use client'
import React,{useEffect, useState} from 'react'
import axios from 'axios'
//import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VerifyEmailPage() {
    
    // const router = useRouter()


    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error, setError] = useState(false)


    const verifyUserEmail = async () => {
       try {
         await axios.post("/api/users/verifyemail", {token})
         setVerified(true)
       } catch (error:any) {
         setError(true)
         console.log("Error in Verifying Email: ",error.response.data);
     }
    }

    useEffect(() => {
        setError(false);
        const url = window.location.search.split("=")[1]
        setToken(url || "")

        // const {query} = router;
        // const url:any = query.token;
        // setToken(url || "")


    },[])
    
    useEffect(() => {
        setError(false);
        if(token.length > 0 ) {
            verifyUserEmail()
        }
    },  [token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-3xl font-bold'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black '>
            {token ? `${token}` : "Invalid Token"}

        </h2>
            {verified && (
                <div>
                    <h2 className='text-2xl font-bold'>Email Verified</h2>
                    <Link href="/login" className='text-blue-600 hover:underline'>Login</Link>
                </div>
            )}
        

        {error && (
                <div>
                    <h2 className='text-2xl font-bold'>An Error occured while verifying your email using token.</h2>
                </div>
            )}

    </div>
  )
}

