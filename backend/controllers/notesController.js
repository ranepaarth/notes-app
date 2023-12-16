const Notes = require("../models/notes.models");
const getAllNotesController = async (req, res) => {
  const notes = await Notes.find({});
  res.status(200).json(notes);
};

const createNotesController = async (req, res) => {
  const newNote = await Notes.create(req.body);
  res.status(200).json(newNote);
};

const updateNotesController = async (req, res) => {
  const { id } = req.params;
  const updatedNotes = await Notes.findByIdAndUpdate(id, { $set: req.body });
  res.status(200).json(updatedNotes);
};

const deleteNotesController = async (req, res) => {
  const { id } = req.params;
  const deletedNotes = await Notes.findByIdAndDelete(id);
  res.status(200).json(deletedNotes);
};

module.exports = {
  getAllNotesController,
  createNotesController,
  updateNotesController,
  deleteNotesController,
};
