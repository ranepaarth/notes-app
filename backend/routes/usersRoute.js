const express = require("express");
const router = express.Router();
const {
  signupUserController,
  loginUserController,
  getAllUserController,
  deleteUserController,
} = require("../controllers/usersController");
router
  .post("/login", loginUserController)
  .post("/signup", signupUserController)
  .get("/", getAllUserController)
  .delete("/:id", deleteUserController);

module.exports = router;
