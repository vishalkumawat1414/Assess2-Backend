const router = require("express").Router();
const authController = require("../controllers/authController")
const multer = require("multer"); //middleware

const upload = multer();


router.post(
	"/signup",
	upload.single("resumeFile"),
	authController.signupcontroller
);
router.post("/login",authController.logincontroller)

module.exports = router