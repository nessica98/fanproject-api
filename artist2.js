const router = require('express').Router()
//const mongoose = require('mongoose')

const Artist = require('./artist.schema')
const moment = require('moment')
router.get('/', (req,res)=>{
    console.log('get /artists')

})

router.post('/add', (req,res)=>{
    //console.log('post /artists/add')
    if(req.body){
        console.log('post /artists/add')
        var artist_name = req.body.artist_name
        var profile_url = req.body.profile_url
        var birthdate = req.body.birthdate
        //console.log(artist_name,profile_url,birthdate)
        if(artist_name && profile_url && birthdate){
            var birthdate_obj = new Date(birthdate)
            
            data = {name:artist_name,profile_url:profile_url,birthdate:birthdate_obj}
            Artist.collection.insert(data, (err,result)=>{
                if(err) console.error(err)
                console.log(result)
                res.send(result)
            })
        }
        else res.sendStatus(400)
    }else{
        res.sendStatus(400)
    }
})

router.put('/update-profile-pic', (req,res)=>{
    //console.log(req.body)
    if(req.body) {
        // 
        console.log('put /artists/update-profile-pic')
        if(req.body.profilepic && req.body.artist_name) {
            Artist.findOneAndUpdate({name:req.body.artist_name},{profile_url:req.body.profilepic},{new:true},(err,doc,result)=>{
                if(err) console.error(err)
                console.log(doc)
                res.send(doc)
            })            
        }
        else res.sendStatus(400);

    }else{
        res.sendStatus(400)
    }
})
module.exports = router