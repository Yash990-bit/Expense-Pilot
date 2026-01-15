const User = require('../models/User')
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body

    if (!fullName || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use"
            })
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        const token = generateToken(user._id)

        res.status(201).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            },
            token,
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Error registering user"
        })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error logging in", error: err.message
        })
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving user info",
            error: err.message
        })
    }
}

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const baseUrl = process.env.BASE_URL || "http://localhost:8000";
        const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    } catch (err) {
        res.status(500).json({ message: "Error uploading image", error: err.message });
    }
}

exports.updateUser = async (req, res) => {
    const { fullName, profileImageUrl } = req.body;

    if (!fullName) {
        return res.status(400).json({ message: "Full name is required" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.fullName = fullName;
        if (profileImageUrl) {
            user.profileImageUrl = profileImageUrl;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
}