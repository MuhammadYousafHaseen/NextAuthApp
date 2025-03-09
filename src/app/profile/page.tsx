'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
       try {
         const res = await axios.post('/api/users/me')
         console.log(res.data.data.username)
         setData(res.data.data._id)
       } catch (error:any) {
            console.log("Error in getting user details: ",error.message);
            toast.error(error.message)
       }
        
    }


    const logout = async () => {
          try {
            const res = await axios.get('/api/users/logout')
            console.log(res.data)
            toast.success("Logged Out successfully")
            router.push('/login')
          } catch (error:any) {
            console.log("Error in logging out: ",error.message);
            toast.error(error.message)
          }
    }
   
    

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-3xl font-bold'>Profile</h1>
        <hr />
        <h2 className='text-3xl font-bold'>{data === 'nothing' ? "nothing to display" : <Link href={'/profile/`${data}`'}>{data}</Link>}</h2>
        <hr />
        <button
        type='button'
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        Logout
        </button>
        <button
        type='button'
        onClick={getUserDetails}
        className="mt-2 px-4 py-2 bg-blue-600 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        Get Details of User
        </button>

    </div>
  )
}

 
