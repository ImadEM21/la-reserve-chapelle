const express = require("express");
const router = express.Router();

const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

const controller = require("../controllers/book");

router.get("/", controller.getBooks);
router.get("/:id", controller.getBook);
router.post("/", auth, multer, controller.createBook);
router.put("/:id", auth, multer, controller.updateBook);
router.delete("/:id", auth, controller.deleteBook);

module.exports = router;
