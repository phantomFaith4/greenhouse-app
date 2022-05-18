const mongoose = require('mongoose');

const WaterSchema = new mongoose.Schema({
    percentage:{
        type:Number,
        required:false,
    },
    location:{ 
        type:String,
        required:true,
    },
    automatic:{
        type:Boolean, 
        default:false,
    },
    water:{
        type:Boolean, 
        default:false,
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Water', WaterSchema);