const mongoose = require('mongoose');

const GreenhouseSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            unique:true,
        },
        content:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:false, 
        },
        size:{ 
            type:String,
            required:false,
        },
        location:{
            type:String,
        },
        owner:{
            type:String,
        }
    },
    {
    timestamps:true,
});

module.exports = mongoose.model('Greenhouse',GreenhouseSchema);