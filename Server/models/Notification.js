const mongoose = require('mongoose');

const NotifiactionSchema = new mongoose.Schema({
    value:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
},
{timestamps},
);

module.exports = mongoose.model('Notification', NotifiactionSchema);