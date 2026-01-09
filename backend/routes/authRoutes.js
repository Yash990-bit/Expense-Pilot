const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.get("/get-user-info", protect, getUserInfo);

module.exports = router;