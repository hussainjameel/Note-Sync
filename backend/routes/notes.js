const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const verifyToken = require("../middleware/verifyToken");

// Get All Notes route:
// GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", verifyToken, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    //Catch unwanted errors
    console.error(error.message);
    res.status(500).json("Interval server error");
  }
});

// Add a new Note route:
// POST "/api/notes/addnote"
router.post(
  "/addnote",
  verifyToken,
  [
    // Express-validations
    body("title", "Enter valid title.").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters.").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      // If errs return bad request and the errs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Destructor method to extract details
      const { title, description, tag } = req.body;
      // Create note using NOTES Schema instance and store in note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // Save note and send as res.json
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      //Catch unwanted errors
      console.error(error.message);
      res.status(500).json("Interval server error");
    }
  }
);

// Update existing Note route:
// PUT "/api/notes/updatenote"
router.put("/updatenote/:id", verifyToken, async (req, res) => {
  try {
    //Destructor method to extract details
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    // Check if title exists then set newNote object title to title sent by user in req.body
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it.
    let note = await Notes.findById(req.params.id); // req.params.id is the id of note to be updated
    // If note dont exists send error
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    //Compare note creater user id with user id requesting to update note. Send error if someone else tries to update someones note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }
    // Else Update note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    //Catch unwanted errors
    console.error(error.message);
    res.status(500).json("Interval server error");
  }
});

// Delete existing Note route:
// DELETE "/api/notes/deletenote"
router.delete("/deletenote/:id", verifyToken, async (req, res) => {
  try {
    //Find the note to be deleted and delete it.
    let note = await Notes.findById(req.params.id); // req.params.id is the id of note to be updated
    // If note dont exists
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    //Compare note creater user id with user id requesting to update note. Send error if someone else tries to delete someones note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted.", note: note });
  } catch (error) {
    //Catch unwanted errors
    console.error(error.message);
    res.status(500).json("Interval server error");
  }
});

module.exports = router;
