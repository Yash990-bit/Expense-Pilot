require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function testRegistration() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully.");

        const testEmail = `test_${Date.now()}@example.com`;
        const testPassword = "Password123!";

        console.log(`Attempting to create test user: ${testEmail}`);

        // Manual hash test
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(testPassword, salt);
        console.log("Bcrypt hash successful:", hash);

        const newUser = await User.create({
            fullName: "Test User",
            email: testEmail,
            password: testPassword,
            profileImageUrl: "http://example.com/image.jpg"
        });

        console.log("User created successfully:", newUser._id);

        // Cleanup
        await User.deleteOne({ _id: newUser._id });
        console.log("Test user cleaned up.");

        process.exit(0);
    } catch (error) {
        console.error("REGISTRATION TEST FAILED:");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        if (error.stack) console.error("Stack Trace:", error.stack);
        process.exit(1);
    }
}

testRegistration();
