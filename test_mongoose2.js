const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
//const Fanproject = require('./fanproject.schema')
const Band = require('./band2.schema')
const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useFindAndModify: false,useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
    );

const connection = mongoose.connection


connection.once('open', ()=>{
    console.log('connection ok')
})

const new_band = new Band({bandName:'WEi',debut_date:new Date('2020-10-05'),bandProfilePicURL:'https://uploads.disquscdn.com/images/be91db9ba602bc4d6fcc73650090c8edddabfe346b44720a01457413a4011592.jpg',members:[]})
new_band.save((err,prod)=>{
    if(err) console.error(err)
    console.log(prod)
})
//mongoose.disconnect()

