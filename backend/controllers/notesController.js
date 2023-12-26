const Notes = require("../models/notes.models");
const getAllNotesController = async (req, res) => {
  try {
    const notes = await Notes.find({}).sort({ _id: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNotesController = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = await Notes.create({ title, content });
    console.log(req.body);
    res.status(200).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNotesController = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNotes = await Notes.findByIdAndUpdate(id, { $set: req.body });
    console.log(updatedNotes);
    res.status(200).json(updatedNotes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNotesController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotes = await Notes.findByIdAndDelete(id);
    res.status(200).json(deletedNotes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllNotesController,
  createNotesController,
  updateNotesController,
  deleteNotesController,
};
