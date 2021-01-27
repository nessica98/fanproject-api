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

const new_band = new Band({bandName:"VERIVERY",debut_date:new Date('2019-01-09'),bandProfilePicURL:'https://i.pinimg.com/originals/56/3d/2a/563d2ac378b66dbd0c520b05ff25c22d.jpg',members:[]})
new_band.save((err,prod)=>{
    if(err) console.error(err)
    console.log(prod)
    mongoose.disconnect()
})
//mongoose.disconnect()

// const Band2 = require('./band3.schema')
// const new_Band2 = new Band2({bandName:'Miss this kiss',bandPic:'123'})
// new_Band2.save((err,prod)=>{
//     console.log(prod)
// })