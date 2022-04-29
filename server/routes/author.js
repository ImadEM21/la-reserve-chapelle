const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-author');

const controller = require("../controllers/author");

router.get("/", controller.getAuthors);
router.get("/:id", controller.getAuthor);
router.post("/", auth, multer, controller.createAuthor);
router.put("/:id", auth, controller.updateAuthor);
router.delete("/:id", auth, controller.deleteAuthor);

module.exports = router;
