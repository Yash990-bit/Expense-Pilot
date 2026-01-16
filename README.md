A full-stack Expense Tracker web application that helps users manage their income, expenses, and balance efficiently.
The project is built with a modern React + Vite frontend and a Node.js + Express + MongoDB backend, following real-world development practices.

## User Features

. User authentication using JWT
. Add, edit, and delete income & expense records
. Automatic balance calculation
. Categorize transactions
. View expenses by date
. Export data to Excel
. Upload files (receipts, documents)
. Emoji support for better UI
. Toast notifications for actions

 ## Dashboard

. Interactive charts using Recharts
. Monthly & category-wise expense visualization
. Clean and responsive UI with Tailwind CSS

## Tech Stack

- Frontend

React 19
Vite
Tailwind CSS
React Router DOM
Axios
Recharts
Moment.js
React Icons
React Hot Toast
Emoji Picker

- Backend

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Bcrypt.js
Multer (File Upload)
XLSX (Excel Export)
CORS
dotenv

## Project Structure

expense-tracker/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md

## Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/Yash990-bit/Expense-Pilot.git
cd expense-tracker

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

3️⃣ Backend Setup
cd backend
npm install
npm run dev

## Environment Variables (Backend)

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
