const mongoose = require('mongoose');
const schema = mongoose.Schema


var band_sche = new schema({ bandName: String, bandHanName: String, debutDate: Date, status: Number }, { collection: 'artist' })

let Artist = mongoose.model('Artist', band_sche)

module.exports = Artist