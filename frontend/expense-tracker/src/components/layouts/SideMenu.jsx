import React, { useContext, useState, useEffect } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
import Modal from '../Modal'
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector'
import Input from '../Inputs/Input'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import uploadImage from '../../utils/uploadImage'

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser, updateUser } = useContext(UserContext)
    const navigate = useNavigate()

    const [openEditModal, setOpenEditModal] = useState(false)
    const [fullName, setFullName] = useState("")
    const [profileImage, setProfileImage] = useState(null)

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "")
            setProfileImage(user.profileImageUrl || null)
        }
    }, [user])

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

    const handleUpdateProfile = async () => {
        if (!fullName.trim()) {
            toast.error("Full Name is required")
            return
        }

        let profileImageUrl = user?.profileImageUrl

        if (profileImage && typeof profileImage === 'object') {
            try {
                const imgUploadRes = await uploadImage(profileImage)
                profileImageUrl = imgUploadRes.imageUrl
            } catch (error) {
                console.error("Image upload failed:", error)
                toast.error("Failed to upload image")
                return
            }
        } else if (!profileImage) {
            profileImageUrl = null;
        }

        try {
            const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_USER, {
                fullName,
                profileImageUrl
            })

            if (response.data && response.data.user) {
                updateUser(response.data.user)
                setOpenEditModal(false)
                toast.success("Profile updated successfully")
            }
        } catch (error) {
            console.error("Profile update failed:", error)
            toast.error(error.response?.data?.message || "Failed to update profile")
        }
    }

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                <div onClick={() => setOpenEditModal(true)} className="cursor-pointer relative group">
                    {user?.profileImageUrl ? (
                        <img
                            src={user?.profileImageUrl || ""}
                            alt="Profile Image"
                            className='w-20 h-20 bg-slate-400 rounded-full group-hover:opacity-80 transition-opacity'
                        />) : (
                        <CharAvatar
                            fullName={user?.fullName}
                            width="w-20"
                            height="h-20"
                            style="text-xl"
                        />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs bg-black/60 text-white px-2 py-1 rounded">Edit</span>
                    </div>
                </div>

                <h5 className='text-gray-950 font-medium leading-6'>
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => {
                return (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-primary" : ""
                            } py-3 px-6 rounded-lg mb-3`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                )
            })}

            <Modal
                isOpen={openEditModal}
                onClose={() => setOpenEditModal(false)}
                title="Edit Profile"
            >
                <div className="flex flex-col gap-4">
                    <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-slate-500">Full Name</label>
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            placeholder="Full Name"
                            type="text"
                        />
                    </div>

                    <button className="btn-primary" onClick={handleUpdateProfile}>
                        Save Changes
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SideMenu
