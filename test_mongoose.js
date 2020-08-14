const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Fanproject = require('./fanproject.schema')
const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useFindAndModify: false,useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
    );

const connection = mongoose.connection


connection.once('open', ()=>{
    console.log('connection ok')
})
const fanproject_res = new Fanproject({fanproject_name:"MRT Birthday Ads ",
    fanproject_date:{fanproject_startdate:new Date(2020,8,1),fanproject_enddate:new Date(2020,8,15)},
    fanproject_place:"MRT Silom Station",
    fanproject_type:"MRT Light box",
    artist_id:"minhyun",
    orginizerName:"hwangjs"})

fanproject_res.save((error)=>{
    if(error) console.log(error);

    console.log('success')
})