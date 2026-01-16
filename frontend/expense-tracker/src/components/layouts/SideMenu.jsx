import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import { validateBaseUrl } from '../../utils/helper'

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout()
            return
        }
        navigate(route)
    }

    const handleLogout = () => {
        localStorage.clear()
        clearUser()
        navigate("/login")
    }

    return (
        <div className="w-64 h-[calc(100vh-100px)] bg-white/[0.03] backdrop-blur-3xl shadow-2xl m-4 rounded-[2.5rem] sticky top-[90px] z-20 flex flex-col border border-white/5">
            <div className='flex flex-col items-center justify-center gap-4 mt-10 mb-12'>
                <div className="relative">
                    {user?.profileImageUrl ? (
                        <img
                            src={validateBaseUrl(user?.profileImageUrl) || ""}
                            alt="Profile"
                            className='relative w-24 h-24 bg-white/5 rounded-full object-cover border border-white/10 p-1'
                        />) : (
                        <div className="relative">
                            <CharAvatar
                                fullName={user?.fullName}
                                width="w-24"
                                height="h-24"
                                style="text-2xl bg-white/5 text-violet-300 font-bold border border-white/10"
                            />
                        </div>
                    )}
                </div>

                <div className='text-center'>
                    <h5 className='text-white font-semibold text-lg tracking-tight'>
                        {user?.fullName || "Guest User"}
                    </h5>
                </div>
            </div>

            <div className='px-4 space-y-1.5 flex-grow'>
                {SIDE_MENU_DATA.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    const isLogout = item.path === 'logout';

                    return (
                        <button
                            key={`menu_${index}`}
                            className={`w-full flex items-center gap-4 text-[13px] font-medium transition-all duration-300 active:scale-95 py-3.5 px-6 rounded-2xl ${isActive
                                ? "text-white bg-violet-600/90 shadow-lg shadow-violet-600/20"
                                : isLogout
                                    ? "text-rose-400 hover:bg-rose-500/10 mt-10"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            onClick={() => handleClick(item.path)}
                        >
                            <item.icon className={`text-xl ${isActive ? "text-white" : isLogout ? "text-rose-400" : "text-slate-400"}`} />
                            {item.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SideMenu
