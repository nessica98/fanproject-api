const mongoose = require('mongoose')
const schema = mongoose.Schema

var band3_sche = new schema({bandName:String,bandPic:String},{collection:"Band"})
const band3_model = new mongoose.model('Band2', band3_sche)

module.exports = band3_model