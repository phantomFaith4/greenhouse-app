const mongoose = require('mongoose');

const CO2Schema = new mongoose.Schema({

},
{
    timestamps:true
}
)

module.exports = mongoose.model('CO2', CO2Schema);