const postController = require("../controllers/postController");
const requireUser = require("../middleware/requireUser");

const router = require("express").Router();


router.get("/all/:email",requireUser,postController.getAllPostController)

module.exports = router