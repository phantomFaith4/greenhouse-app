const mongoose = require('mongoose');

const CO2Schema = new mongoose.Schema({
    fan:{
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
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('CO2', CO2Schema);