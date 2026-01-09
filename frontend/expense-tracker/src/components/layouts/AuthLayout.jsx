import React from 'react'
import Card_1 from "../../assets/images/card1.png"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
      </div>
      <div className='hidden md:flex w-[40vw] h-screen bg-violet-50 overflow-hidden relative justify-center items-center'>
        <div className='w-64 h-64 bg-violet-500 rounded-full absolute -top-10 -right-10 opacity-20' />
        <div className='w-48 h-48 bg-violet-500 rounded-full absolute bottom-10 left-10 opacity-20' />

        <img src={Card_1} className='w-3/4 object-contain drop-shadow-2xl' />
      </div>
    </div>
  )
}

export default AuthLayout