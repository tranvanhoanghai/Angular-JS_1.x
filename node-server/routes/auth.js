const express = require("express");
const router = express.Router();
const auth = require("../app/controllers/auth.controller");

/* GET users listing. */
router.post("/", auth.login);
router.post("/", auth.logout);

module.exports = router;
