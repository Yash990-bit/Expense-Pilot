const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserInfo, uploadImage, updateUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/create-account", registerUser);
router.post("/login", loginUser);
router.get("/get-user-info", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), uploadImage);
router.put("/update-user", protect, updateUser);

module.exports = router;