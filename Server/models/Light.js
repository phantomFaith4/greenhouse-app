const mongoose = require('mongoose');

const LightSchema = new mongoose.Schema({

},
{
    timestamps:true,
});

module.exports = mongoose.model('Light',LightSchema);
