'use client'


import React from 'react'

export default function page({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-3xl font-bold'>Profile Page</h1>
      <h2 className='text-2xl p-3 bg-gray-200 rounded-lg'>{params.id}</h2>
    </div>
  )
}

