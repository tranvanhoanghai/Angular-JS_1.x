const express = require("express");
const router = express.Router();
const contactController = require("../app/controllers/contact.controller");

/* GET users listing. */
// router.get("/:slug", usersController.getDetail);
router.get("/:id", contactController.getIdContact);
router.get("/", contactController.getListContacts);
router.post("/", contactController.createdContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
