const express = require("express");
const router = express.Router();
const { Notes } = require("../models/notes.model");
// const { check, validationResult } = require("express-validator")
const _ = require("lodash");

router
  .route("/")

  // .get(async (req, res) => {
  //   try {
  //     const data = await Notes.find().sort({_id:-1});
  //     res.json({ success: true, data });
  //   } catch (err) {
  //     res
  //       .status(500)
  //       .json({
  //         success: false,
  //         message: "Unable to load Notes",
  //         errorMessage: err.message,
  //       });
  //   }
  // })

  .post(async (req, res) => {
   
    try {
      const note = req.body;
      const NewNote = new Notes(note);
      const savedNote = await NewNote.save();
      res.json({ success: true, message:"Note Added Successfully", note: savedNote });
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

  router.route("/:uid")
  .get(async (req, res) => {
    try {
      const uid = req.params.uid
      const data = await Notes.find({uid:uid}).sort({_id:-1});
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
 
  router
  .route("/change-color")
  .post(async(req,res)=>{
    try{
      const {id,bgColor} = req.body
      const note = await Notes.findOne({_id:id});
      const noteData =_.extend(note, {bgColor:bgColor});
      await noteData.save();
      res.json({ success: true, message:"Updated the note color", note:noteData });
    }catch(err){
      res.status(500).json({success:false,message:"unable to change the color",errorMessage:err.message})
    }
  })
  router
  .route("/archive")
  .post(async(req,res)=>{
    try{
      const {id} = req.body
      const note = await Notes.findOne({_id:id});
      const noteData =_.extend(note, {isArchive:!note.isArchive,isDelete:false});
      await noteData.save();
      res.json({ success: true, message:"Note Archived", note:noteData });
    }catch(err){
      res.status(500).json({success:false,message:"unable to Archive the note",errorMessage:err.message})
    }
  })

  router
  .route("/trash")
  .post(async(req,res)=>{
    try{
      const {id} = req.body
      const note = await Notes.findOne({_id:id});
      const noteData =_.extend(note, {isDelete:!note.isDelete,isArchive:false});
      await noteData.save();
      res.json({ success: true, message:"Note Trashed", note:noteData });
    }catch(err){
      res.status(500).json({success:false,message:"unable to Trash the note",errorMessage:err.message})
    }
  })

  router
  .route("/update")
  .post(async(req,res)=>{
    try{
      const{id,updatedTitle,updatedNote,updatedTag} = req.body
      const note = await Notes.findOne({_id:id})
      const noteData = _.extend(note,{title:updatedTitle,note:updatedNote,tag:updatedTag})
      await noteData.save()
      res.json({ success: true, message:"Note Updated", note:noteData });
    }catch(err){
      res.status(500).json({success:false,message:"Unable to update the note",errorMessage:err.message})
    }
  })

  router
  .route("/pinned/:id")
  .post(async(req,res)=>{
    try{
      const {id} = req.params
      const note = await Notes.findOne({_id:id})
      const noteData = _.extend(note,{isPinned:!note.isPinned})
      await noteData.save()
      res.json({ success: true, message:"Note Pinned", note:noteData });
    }catch(err){
      res.status(500).json({success:false,message:"Unable to pin the note",errorMessage:err.message})
    }
  })

module.exports = router;
