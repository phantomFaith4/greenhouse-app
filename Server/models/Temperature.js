const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
    temperature:{
        value : Number,
        automatic : false, 
    },
},
{timestamps:true},
);

module.exports = mongoose.model('Temperature',)