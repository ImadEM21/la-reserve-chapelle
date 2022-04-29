const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const controller = require("../controllers/loan");

router.get("/", auth, controller.getLoans);
router.get("/:id", auth, controller.getLoan);
router.get('/resident/:id', auth, controller.getResidentLoans);

module.exports = router;
