const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserInfo, uploadImage } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.get("/get-user-info", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;