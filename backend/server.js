require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5174",
    "http://localhost:5173",
    "https://expense-pilot-liard.vercel.app"
].filter(Boolean);

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: "*",
        credentials: true
    })
)

app.use(express.json())

// Trust proxy for Render/Vercel to correctly identify protocol (http vs https)
app.enable("trust proxy");

connectDB()

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
    res.send("Server is running | Expense Tracker API");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is running" })
})

if (process.env.VERCEL) {
    module.exports = app
} else {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}