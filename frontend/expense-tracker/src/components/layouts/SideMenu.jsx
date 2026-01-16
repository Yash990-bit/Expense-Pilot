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
        <div className="w-64 h-[calc(100vh-81px)] bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/40 m-4 rounded-3xl sticky top-[81px] z-20 flex flex-col border border-white/10">
            <div className='flex flex-col items-center justify-center gap-3 mt-8 mb-10'>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    {user?.profileImageUrl ? (
                        <img
                            src={validateBaseUrl(user?.profileImageUrl) || ""}
                            alt="Profile Image"
                            className='relative w-20 h-20 bg-slate-800 rounded-full object-cover border-2 border-white/20'
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />) : (
                        <div className="relative">
                            <CharAvatar
                                fullName={user?.fullName}
                                width="w-20"
                                height="h-20"
                                style="text-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-300 font-bold border border-violet-500/30"
                            />
                        </div>
                    )}
                </div>

                <div className='text-center'>
                    <h5 className='text-white font-bold text-lg leading-tight tracking-tight'>
                        {user?.fullName || "Guest User"}
                    </h5>
                    <p className='text-slate-400 text-xs font-medium uppercase tracking-widest mt-1'>
                        Free Account
                    </p>
                </div>
            </div>

            <div className='px-4 space-y-2 flex-grow'>
                {SIDE_MENU_DATA.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    const isLogout = item.path === 'logout';

                    return (
                        <button
                            key={`menu_${index}`}
                            className={`w-full flex items-center gap-4 text-[14px] font-semibold ${isActive
                                ? "text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-900/30"
                                : isLogout
                                    ? "text-rose-400 hover:bg-rose-500/10"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                } py-3.5 px-6 rounded-2xl transition-all duration-300 active:scale-95`}
                            onClick={() => handleClick(item.path)}
                        >
                            <item.icon className={`text-xl ${isActive ? "text-white" : isLogout ? "text-rose-400" : "text-slate-400 group-hover:text-white"}`} />
                            {item.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SideMenu
