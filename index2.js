const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyps = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()


const api = require('./api')


const app = express()
app.use(bodyps.json())
app.use(cors())

app.use('/api', api)

const PORT = process.env.PORT || 5000
app.listen(process.env.PORT || 5000, ()=>{
    console.log('app run and listen at '+PORT)
})

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useFindAndModify: false,useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
    );

const connection = mongoose.connection


connection.once('open', ()=>{
    console.log('connection ok')
})