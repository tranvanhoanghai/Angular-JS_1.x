const express = require("express");
const router = express.Router();
const usersController = require("../app/controllers/user.controller");

/* GET users listing. */
// router.get("/:slug", usersController.getDetail);
router.get("/", usersController.getAllUser);
router.post("/", usersController.add);

module.exports = router;
