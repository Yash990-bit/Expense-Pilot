import React from 'react'
import Card_1 from "../../assets/images/card1.png"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-2xl font-black text-white tracking-tighter'>
          Expense<span className='text-violet-500'>Tracker</span>
        </h2>
        {children}
      </div>
      <div className='hidden md:flex w-[40vw] h-screen bg-gradient-to-br from-indigo-700 to-purple-800 relative overflow-hidden flex-col justify-start p-16 pt-24'>
        <div className='relative z-10 w-full max-w-lg'>
          {/* Header Messaging */}
          <div className='mb-12 text-white'>
            <h3 className='text-4xl font-bold mb-4 tracking-tight'>Smart Finance, Simplified.</h3>
            <p className='text-indigo-100/90 text-lg leading-relaxed'>
              The easiest way to track your daily expenses and savings.
            </p>
          </div>

          {/* Minimalist Dashboard Preview */}
          <div className='relative mt-8'>
            <div className='absolute -inset-10 bg-white/5 blur-3xl rounded-full' />
            <img
              src={Card_1}
              className='relative w-full h-auto object-contain drop-shadow-2xl'
              alt="Dashboard"
            />
          </div>
        </div>

        {/* Subtle Background Decoration */}
        <div className='absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl' />
        <div className='absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl' />
      </div>
    </div>
  )
}

export default AuthLayout