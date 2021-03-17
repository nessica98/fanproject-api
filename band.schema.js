const mongoose = require('mongoose');
const schema = mongoose.Schema


<<<<<<< HEAD
var band_sche = new schema({bandName:String,bandHanName:String,debutDate:Date,status:Number},{ collection: 'artist' })

let Artist = mongoose.model('Artist',band_sche)
=======
var band_sche = new schema({ bandName: String, bandHanName: String, debutDate: Date, status: Number }, { collection: 'artist' })

let Artist = mongoose.model('Artist', band_sche)
>>>>>>> 0564e0534a0169ec41949c274efdf1cb5c388633

module.exports = Artist