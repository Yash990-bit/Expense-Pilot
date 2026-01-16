import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import SideMenu from './SideMenu'

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)

    return (
        <div className='flex gap-5 bg-black border-b border-white/10 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 '>
            <button
                className='block lg:hidden text-white'
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

            <h2 className="text-xl font-bold text-white tracking-tight">
                Expense <span className="text-primary">Tracker</span>
            </h2>

            {openSideMenu && (
                <div className='fixed top-[61px] left-0 bg-white shadow-lg z-40 w-64 h-[calc(100vh-61px)] overflow-y-auto'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar