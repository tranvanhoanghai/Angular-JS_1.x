const express = require("express");
const router = express.Router();
const contactController = require("../app/controllers/contact.controller");

/* GET users listing. */
// router.get("/:slug", usersController.getDetail);
router.get("/:id", contactController.getIdContacts);
router.get("/", contactController.getListContacts);
router.post("/", contactController.createdContacts);
router.put("/:id", contactController.updateContacts);
router.delete("/:id", contactController.deleteContacts);

module.exports = router;
