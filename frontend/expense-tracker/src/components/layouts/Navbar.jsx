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
                    <h2 className="text-2xl font-black text-white tracking-tighter">
                        Expense<span className="text-violet-500">Tracker</span>
                    </h2>
                </div>
            </div>

            {/* Removed System Status section */}

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