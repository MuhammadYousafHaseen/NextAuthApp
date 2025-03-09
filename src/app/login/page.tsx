'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'


export default function LoginPage() {

  const router = useRouter()
  
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login Success: ", response.data)
      router.push("/profile")
    } catch (error:any) {
      console.log("Login Error: ", error)
      toast.error(error.message)  
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  } , [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold'>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email" className='p-2 text-2xl'>E-mail</label>
      <input
      className='border border-gray-300 p-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
      type="email" id="email" placeholder='E-mail' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
      <label htmlFor="password" className='p-2 text-2xl'>Password</label>
      <input
      className='border border-gray-300 p-2 m-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
      type="password" id="password" placeholder='Password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
      <button
      onClick={onSignup}
      className='bg-blue-600 text-white p-2 m-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-500'
      disabled={buttonDisabled}
      >
        {buttonDisabled ? "Please fill the form" : "Login"}

      </button>

    </div>
  )
}





