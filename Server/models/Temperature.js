const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    temperature:{ 
        type : Number,
        required:true,    
    },
    location:{
        type:String,
        required:true,
        unique:true,
    },  
    automatic:{ 
        type:Boolean, 
        default:false, 
    },
},
{timestamps:true},
);

module.exports = mongoose.model('Temperature', TemperatureSchema);