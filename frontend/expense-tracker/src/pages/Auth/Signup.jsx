import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { useNavigate, Link } from "react-router-dom";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const Signup = () => {
    const [profilePic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const { updateUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        if (!fullName) {
            setError("Please enter your name")
            return
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return
        }

        if (!password) {
            setError("Please enter your password")
            return
        }
        setError("")

        try {
            let profileImageUrl = ""
            if (profilePic) {
                try {
                    const imgUploadRes = await uploadImage(profilePic)
                    profileImageUrl = imgUploadRes.imageUrl || ""
                } catch (uploadError) {
                    setError("Failed to upload profile image. Please try again.")
                    return // Stop registration if image upload fails
                }
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            })

            const { token, user } = response.data

            if (token) {
                localStorage.setItem("token", token)
                updateUser(user)
                navigate("/dashboard")

            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-primary">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
                    Please enter your details to sign up
                </p>

                <form onSubmit={handleSignup}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            value={fullName}
                            onChange={(value) => setFullName(value)}
                            label="Full Name"
                            placeholder="Enter your full name"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={(value) => setEmail(value)}
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                        />

                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={(value) => setPassword(value)}
                                label="Password"
                                placeholder="Min 8 Characters"
                                type="password"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Sign Up
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link className="font-medium text-primary underline " to="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Signup
