const express = require("express");
const router = express.Router();
const contactController = require("../app/controllers/contact.controller");

/* GET users listing. */
router.get("/:id", contactController.detailContact);
router.get("/", contactController.getListContacts);
router.post("/", contactController.createdContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
