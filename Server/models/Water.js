const mongoose = require('mongoose');

const WaterSchema = new mongoose.Schema({
    percentage:{
        type:Number,
        required:false,
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
    water:{
        type:Boolean, 
        default:false, 
    },
    amount:{
        type:Number,
    },
    fertilizer:{
        type:Boolean,
        default:false,
    },
    run:{
        type: Boolean,
        default:false,
    },
    time:{
        type:String,
    },
    date:{
        type:String,
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Water', WaterSchema);