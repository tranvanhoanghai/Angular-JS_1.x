const express = require("express");
const router = express.Router();
const auth = require("../app/controllers/auth.controller");

router.post("/login", auth.login);
router.post("/changePassword", auth.changePassword);

module.exports = router;
