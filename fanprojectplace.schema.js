const mongoose = require('mongoose')
const schema = mongoose.Schema

var fanprojectplace_sche = new schema({
    fanprojectplace_name :{ type: String, required: true },
    fanprojectplace_desc : { type: String },
    fanprojectplace_location : { type: {lat:Number,lon:Number}, required: true },
    fanprojectcontact :[{
        accType: {
            type: String, enum: ['FB', 'TWT'],
            accid: { type: String, required: true }
        }
    }]

});

let Fanproject = mongoose.model('fanprojectplace', fanprojectplace_sche)

module.exports = Fanproject