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
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                <div className="relative group">
                    {user?.profileImageUrl ? (
                        <img
                            src={validateBaseUrl(user?.profileImageUrl) || ""}
                            alt="Profile Image"
                            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
                            onError={(e) => {
                                e.target.style.display = 'none'; // Hide broken image
                                e.target.nextSibling.style.display = 'flex'; // Show avatar
                            }}
                        />) : (
                        <CharAvatar
                            fullName={user?.fullName}
                            width="w-20"
                            height="h-20"
                            style="text-xl"
                        />
                    )}
                    {/* Fallback CharAvatar if image breaks (hidden by default if image exists) */}
                    {user?.profileImageUrl && (
                        <div className="absolute inset-0 hidden items-center justify-center bg-slate-400 rounded-full">
                            <CharAvatar
                                fullName={user?.fullName}
                                width="w-20"
                                height="h-20"
                                style="text-xl"
                            />
                        </div>
                    )}
                </div>

                <h5 className='text-gray-950 font-medium leading-6'>
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => {
                const isActive = activeMenu === item.label;
                const isLogout = item.path === 'logout';

                return (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${isActive
                            ? "text-white bg-emerald-500 shadow-lg shadow-emerald-200"
                            : isLogout
                                ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            } py-3 px-6 rounded-lg mb-3 transition-all duration-200`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                )
            })}

        </div>
    )
}

export default SideMenu
