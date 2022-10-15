const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:""
    },
    username:{
        type:String,
        required:true
    },
    catagories:{
        type:Array
    }
},
    { timestamps:true }
);

module.exports = mongoose.model("Post",PostSchema);