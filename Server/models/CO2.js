const mongoose = require('mongoose');

const CO2Schema = new mongoose.Schema({
    fan1:{
        type: Boolean,
        default: false,
    },
    fan2:{
        type: Boolean,
        default: false,
    },
    location:{
        type: String,
        required: true,
        unique: true,
    },
    speed:{ 
        type: Number, 
    },
    run:{
        type:Boolean,
        default:false,
    },
    automatic:{ 
        type:Boolean,
        default:false,
    },
    time:{
        type:String, 
    },
    date:{
        type:String,
    },
},
{
    timestamps:true
}
)

module.exports = mongoose.model('CO2', CO2Schema);