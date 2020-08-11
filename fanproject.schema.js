const mongoose = require('mongoose')
const schema = mongoose.Schema

var fanproject_sche = new schema({fanproject_name:String,fanproject_date:{fanproject_startdate:Date,fanproject_enddate:Date},fanproject_type:String,artist_id:String,orginizerName:String});

let Fanproject = mongoose.model('fanproject', fanproject_sche)

module.exports = Fanproject