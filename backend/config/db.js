const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        if (err.message.includes("Could not connect to any servers")) {
            console.error(
                "\nTIP: If you're using MongoDB Atlas, make sure your current IP address is whitelisted in the Network Access settings.\n"
            );
        }
        process.exit(1);
    }
};

module.exports = connectDB;