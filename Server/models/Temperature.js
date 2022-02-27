const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    temperature:{
        type:String,
        automatic:false, 
    },
},
{timestamps:true},
);

module.exports = mongoose.model('Temperature',)