const express = require("express");
const router = express.Router();
const dashboardController = require("../app/controllers/dashboard.controller");

/* GET users listing. */
// router.get("/:id", contactController.detailContact);
router.get("/", dashboardController.getDataDashBoard);
// router.post("/", contactController.createdContact);
// router.put("/:id", contactController.updateContact);
// router.delete("/:id", contactController.deleteContact);

module.exports = router;
