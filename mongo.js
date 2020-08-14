const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const request = require('request')
const bodyps = require('body-parser')
const dotenv = require('dotenv')

const Artist = require('./artist.schema')

const d_day = require('./D_day') 
const artists = require('./artist2')
const fanproject = require('./fanproject')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyps.json())
app.use('/artists', artists)
app.use('/fanproject', fanproject)

app.get('/',(req,res)=>{
    console.log('get /')
    res.send('hello world');
})

app.get('/artist',(req,res)=>{
    console.log('get /artist')
    Artist.find((err,result)=>{
        if(err) { console.log(err) }
        else {
            //console.log(result)
            result = result.filter((val,index)=>{
                //console.log('debug',val._doc.birthdate)
                return val._doc.birthdate
            })
            res.send(result)
        }
    })
    //res.send('hello world');
    
})

app.get('/dday/coming', (req,res)=>{
    console.log('get /dday/coming')
    request('http://127.0.0.1:5000/artist', (err,resp,body)=>{
        console.error('error:', err); // Print the error if one occurred
        console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        body = JSON.parse(body)
        //console.log(typeof body)
        var d_dayArr = body.map((val)=>{
            var bd = new Date(val.birthdate)
            
            var bd_month = bd.getMonth()
            var bd_day = bd.getDate()
            var date_string = `${bd_day} ${bd_month+1}`
            return {...val,"dday":d_day(date_string)}
        })
        d_dayArr = d_dayArr.filter((val)=>{return val.dday<=0})
        d_dayArr = d_dayArr.sort((a,b)=> b.dday - a.dday) // decending sort
        res.send(d_dayArr)
    })
})

app.get('/dday/past', (req,res)=>{
    console.log('get /dday/past')
    request('http://127.0.0.1:5000/artist', (err,resp,body)=>{
        console.error('error:', err); // Print the error if one occurred
        console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        body = JSON.parse(body)
        //console.log(typeof body)
        var d_dayArr = body.map((val)=>{
            //console.log(val.birthdate)
            var bd = new Date(val.birthdate)
            //console.log('bd ',bd)
            //console.log(typeof bd)
            var bd_month = bd.getMonth()
            var bd_day = bd.getDate()
            //console.log('bd month date',bd_month,bd_day)
            var date_string = `${bd_day} ${bd_month+1}`
            return {...val,"dday":d_day(date_string)}
        })
        d_dayArr = d_dayArr.filter((val)=>{return val.dday>0})
        d_dayArr = d_dayArr.sort((a,b)=> a.dday - b.dday) // decending sort
        res.send(d_dayArr)
        //res.send(d_dayArr)
    })
})


app.listen(process.env.PORT || 5000, ()=>{
    console.log('app run and listen at 5000')
})

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useFindAndModify: false,useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
    );

const connection = mongoose.connection


connection.once('open', ()=>{
    console.log('connection ok')
})