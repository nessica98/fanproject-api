const mongoose = require('mongoose');
const schema = mongoose.Schema

var artist_sche = new schema({name:String,profile_url:String},{ collection: 'artist' })

let Artist = mongoose.model('Artist',artist_sche)

module.exports = Artist