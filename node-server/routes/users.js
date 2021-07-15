const express = require("express");
const router = express.Router();
const usersController = require("../app/controllers/user.controller");

/* GET users listing. */
router.get("/:id", usersController.detailUser);
router.get("/", usersController.getListUsers);
router.get("/except/:id", usersController.getListExceptUsers);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
