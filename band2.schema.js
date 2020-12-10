const mongoose = require('mongoose');
const schema = mongoose.Schema

var artist_sche = new schema({bandName:String,debut_date:Date,bandProfilePicURL:String,members:[schema.Types.ObjectId]},{ collection: 'Band' })

let Band = mongoose.model('Band',artist_sche)

module.exports = Band