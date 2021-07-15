const express = require("express");
const router = express.Router();
const dashboardController = require("../app/controllers/dashboard.controller");

router.get("/", dashboardController.getDataDashBoard);

module.exports = router;
