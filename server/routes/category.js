const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const controller = require("../controllers/category");

router.get("/", controller.getCategories);
router.get("/:id", controller.getCategory);
router.post("/", auth, controller.createCategory);
router.put("/:id", auth, controller.updateCategory);
router.delete("/:id", auth, controller.deleteCategory);

module.exports = router;
