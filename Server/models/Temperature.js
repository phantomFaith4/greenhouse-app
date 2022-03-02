const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    temperature:{ 
        type : Number,
        required:true,    
},  
    automatic:{ 
        type:Boolean, 
        default:false,
    },
},
{timestamps:true},
);

module.exports = mongoose.model('Temperature', TemperatureSchema);