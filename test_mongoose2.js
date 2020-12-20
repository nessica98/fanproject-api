const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
//const Fanproject = require('./fanproject.schema')
//const Band = require('./band2.schema')
const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useFindAndModify: false,useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
    );

const connection = mongoose.connection


connection.once('open', ()=>{
    console.log('connection ok')
})
/*
const new_band = new Band({bandName:'THE BOYZ',debut_date:new Date('2017-12-06'),bandProfilePicURL:'https://assets.teenvogue.com/photos/5f6522bf3fe249ad4d0498ce/16:9/w_2560%2Cc_limit/theboyz_stealer_01.jpg',members:[]})
new_band.save((err,prod)=>{
    if(err) console.error(err)
    console.log(prod)
})
//mongoose.disconnect()
*/
const Band2 = require('./band3.schema')
const new_Band2 = new Band2({bandName:'Miss this kiss',bandPic:'123'})
new_Band2.save((err,prod)=>{
    console.log(prod)
})