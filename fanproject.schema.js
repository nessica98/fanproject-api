const mongoose = require('mongoose')
const schema = mongoose.Schema

var fanproject_sche = new schema({
    fanproject_name: {type:String, required:true}, 
    fanproject_date: {type:{ fanproject_startdate: Date, fanproject_enddate: Date }, required:true}, 
    fanproject_type: {type:String, required:true}, 
    artistId: {
        artistType: {
            type: String,
            enum: ['BAND', 'ARTISTS'],
            default: 'ARTISTS'
        }, 
        IdList: [schema.Types.ObjectId]
    }, 
    organizer: { organizerName: String, organizerTwitter: String }
});

let Fanproject = mongoose.model('fanproject', fanproject_sche)

module.exports = Fanproject