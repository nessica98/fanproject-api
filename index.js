var express = require('express');
var cors = require('cors');
var axios = require('axios');
var mysql = require('mysql');
var bodyPs = require('body-parser');

const artist = require('./artist')

var app = express()

app.use(cors())
app.use(bodyPs.json())

app.use('/artists', artist)

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database:"test"
});

app.get('/mvlist', (req,res)=>{
    console.log('GET MV list')
    con.query("SELECT * FROM mvlist", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
})

app.get('/artist', (req,res)=>{
    console.log('GET Artist list')
    con.query("SELECT * FROM member_pic", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
})
app.listen(5000, ()=>{
    console.log('App started')
    con.connect((err)=>{
        if(err) throw err
        console.log('DB connection start')
    })
})