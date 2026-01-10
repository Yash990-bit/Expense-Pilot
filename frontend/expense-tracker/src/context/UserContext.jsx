import React, { createContext, useState, useEffect } from "react"
import axiosInstance from "../utils/axiosinstance"
import { API_PATHS } from "../utils/apiPaths"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const updateUser = (userData) => {
        setUser(userData)
    }

    const clearUser = () => {
        setUser(null)
    }

    const fetchUser = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
            if (response.data) {
                setUser(response.data)
            }
        } catch (error) {
            console.error("Error fetching user data:", error)
            // If token is invalid or expired, clear it
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token")
                clearUser()
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                loading,
                fetchUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider