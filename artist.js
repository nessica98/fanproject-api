const Router = require('express').Router()
const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:"test"
  });

  Router.get('/new', (req,res)=> {
    console.log('get all artist')
    con.query("SELECT * FROM artist", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
})

Router.get('/', (req,res)=> {
    console.log('get all artist')
    con.query("SELECT * FROM member_pic", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
})

Router.post('/add', (req,res)=>{
    console.log(req.body);
    let memberName = req.body.memberName;
    let Band_name = req.body.Band_name;
    let url_pic = req.body.url_pic;
    if(memberName&&Band_name&&url_pic){
        
        var sql_inst = `INSERT INTO member_pic VALUES ('${memberName}', '${Band_name}', '${url_pic}');`
        console.log(sql_inst)
    con.query(sql_inst, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
      })
    }
    else{
        res.sendStatus(404).send('error' )
    }
    
})

Router.post('/add-artist', (req,res)=>{
  let 
})

module.exports = Router