const express = require("express");
const router = express.Router();

const {
  getAllNotesController,
  createNotesController,
  updateNotesController,
  deleteNotesController,
} = require("../controllers/notesController");
const { requireAuth } = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getAllNotesController).post("/", createNotesController);

router
  .patch("/:id", updateNotesController)
  .delete("/:id", deleteNotesController);

module.exports = router;
