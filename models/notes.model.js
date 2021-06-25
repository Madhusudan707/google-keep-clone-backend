const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  uid:String,
  title: String,
  note:String,
  bgColor:{type:String,default:"bg-transparent"},
  isArchive:{type:Boolean,default:false},
  isDelete:{type:Boolean,default:false},
  isPinned:{type:Boolean,default:false}

},{timestamps: true});

const Notes = mongoose.model("Notes",NotesSchema)
module.exports = {Notes}


