const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Notes",notesSchema)