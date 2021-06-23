const express = require("express");
const router = express.Router();
const { Notes } = require("../models/notes.model");
const { check, validationResult } = require("express-validator")

router
  .route("/")

  .get(async (req, res) => {
    try {
      const data = await Notes.find().sort({_id:-1});
      res.json({ success: true, data });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Unable to load Notes",
          errorMessage: err.message,
        });
    }
  })

  .post(async (req, res) => {
   
    try {
      const note = req.body;
      const NewNote = new Notes(note);
      const savedNote = await NewNote.save();
      res.json({ success: true, note: savedNote });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to add Note",
          errorMessage: err.message,
        });
    }
  });

module.exports = router;
