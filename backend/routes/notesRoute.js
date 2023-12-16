const express = require("express");
const router = express.Router();

const {
  getAllNotesController,
  createNotesController,
  updateNotesController,
  deleteNotesController,
} = require("../controllers/notesController");

router.get("/", getAllNotesController).post("/", createNotesController);

router
  .patch("/:id", updateNotesController)
  .delete("/:id", deleteNotesController);

module.exports = router;
