const Notes = require("../models/notes.models");
const getAllNotesController = async (req, res) => {
  const user_id = req.user._id;
  try {
    const notes = await Notes.find({ user_id }).sort({ _id: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createNotesController = async (req, res) => {
  const { title, content } = req.body;
  try {
    const user_id = req.user._id;
    const newNote = await Notes.create({ title, content, user_id });
    // console.log(req.body);
    res.status(200).json(newNote);
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const updateNotesController = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id);
    if (note?.content === req.body) {
      return res.status(200);
    }
    const updatedNotes = await Notes.findByIdAndUpdate(id, { $set: req.body });
    // console.log(updatedNotes);
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
