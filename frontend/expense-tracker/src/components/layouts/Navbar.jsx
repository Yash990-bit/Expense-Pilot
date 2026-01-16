import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)

    return (
        <div className='flex items-center justify-between bg-black/40 backdrop-blur-xl border-b border-white/5 h-20 px-8 sticky top-0 z-30'>
            <div className='flex items-center gap-6'>
                <button
                    className='block lg:hidden text-white/80 hover:text-white transition-colors'
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu)
                    }}
                >
                    {openSideMenu ? (
                        <HiOutlineX className='text-2xl' />
                    ) : (
                        <HiOutlineMenu className='text-2xl' />
                    )}
                </button>

                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20'>
                        <span className='text-white font-black text-xl'>E</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tighter">
                        Expense<span className="text-violet-500 italic">Pilot</span>
                    </h2>
                </div>
            </div>

            {/* Placeholder for future Navbar actions like notifications/profile */}
            <div className='hidden md:flex items-center gap-4'>
                <div className='h-8 w-[1px] bg-white/10 mx-2'></div>
                <div className='text-right'>
                    <p className='text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1'>System Status</p>
                    <div className='flex items-center gap-1.5 justify-end'>
                        <div className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse'></div>
                        <p className='text-[12px] text-slate-300 font-bold'>Operational</p>
                    </div>
                </div>
            </div>

            {openSideMenu && (
                <div className='fixed top-20 left-0 bg-black/60 backdrop-blur-3xl z-40 w-full h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in duration-300'>
                    <div className='max-w-[280px] h-full'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar