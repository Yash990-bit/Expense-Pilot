require("dotenv").config();
const mongoose = require("mongoose");

const testConnection = async () => {
    console.log("Attempting to connect to MongoDB...");
    console.log("URI:", process.env.MONGO_URI ? "Found" : "NOT FOUND");

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        console.log("SUCCESS: Connected to MongoDB successfully!");
        process.exit(0);
    } catch (err) {
        console.error("FAILURE: Could not connect to MongoDB.");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Error Code:", err.code);

        if (err.message.includes("Could not connect to any servers")) {
            console.log("\n[DIAGNOSIS]: This is likely an IP Whitelist issue in MongoDB Atlas.");
            console.log("Please ensure your current IP is whitelisted in MongoDB Atlas -> Network Access.");
        }

        process.exit(1);
    }
};

testConnection();
