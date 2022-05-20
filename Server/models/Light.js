const mongoose = require('mongoose');

const LightSchema = new mongoose.Schema({
    location:{
        type: String,
        required: true,
    },
    intensitiy:{
        type: Number,
    },
    automatic:{
        type: Boolean,
        default:false,
    },
    run:{
        type: Boolean,
        default: false,
    }
},
{
    timestamps:true,
});

module.exports = mongoose.model('Light',LightSchema);
