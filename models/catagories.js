const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   }
},
    { timestamps:true }
);

module.exports = mongoose.model("Catagories",CatSchema);