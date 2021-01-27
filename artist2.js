const router = require('express').Router()
//const mongoose = require('mongoose')

const Artist = require('./artist.schema')
const Band = require('./band2.schema')
const moment = require('moment')

//const  = require('./artist.schema')
router.get('/:id', (req,res)=>{
    const { id } = req.params
    console.log('get /artists/'+id)
    Artist.findById(id, (err,doc)=>{
        if(err) {
            res.sendStatus(500)
        }
        res.send(doc)
    })
})


router.post('/v2/add', (req,res)=>{
    var {artist_name,profile_url,birthdate,artist_band} = req.body
    if(!(artist_name&&profile_url&&birthdate&&artist_band)){
        res.sendStatus(400)
    }
    console.log(artist_band)
    var artist_band_l;
    if(artist_band==='SOLO'){
        const birthdate_obj = new Date(birthdate)
        const new_artist =new Artist({name:artist_name,profile_url:profile_url,birthdate:birthdate_obj})
        new_artist.save(fn=(err,Doc)=>{
            if(err) {
                console.error(err)
                res.sendStatus(500)
            }
            res.send(Doc)
            return
        })
        
    }else{
    Band.find({bandName:artist_band}, (err,data)=>{
        if(err) {
            console.error(err)
            res.sendStatus(500)
        }
        console.log(data)
        artist_band_l = data
        console.log(artist_band_l)
        if(artist_band_l.length<1){
            res.status(404).send('Band not exists')
            return
        }
        var new_bandid = artist_band_l[0]._id
        const birthdate_obj = new Date(birthdate)
        console.log({name:artist_name,profile_url:profile_url,birthdate:birthdate_obj,bandId:new_bandid})
        const new_artist =new Artist({name:artist_name,profile_url:profile_url,birthdate:birthdate_obj,bandId:new_bandid})
        new_artist.save(fn=(err,Doc)=>{
            if(err) {
                console.error(err)
                res.sendStatus(500)
            }
            console.log('vefore push',Doc)
            Band.findByIdAndUpdate(Doc.bandId,{$push:{members:Doc._id}},(err,Doc_res)=>{
                console.log(Doc_res)
                res.send(Doc_res)
            })
            //res.send(Doc)
    })
   
    
})
}})

router.post('/add', (req,res)=>{
    //console.log('post /artists/add')
    if(req.body){
        console.log('post /artists/add')
        var {artist_name,profile_url,birthdate} = req.body
        //console.log(artist_name,profile_url,birthdate)
        if(artist_name && profile_url && birthdate){
            var birthdate_obj = new Date(birthdate)
            var data = {name:artist_name,profile_url:profile_url,birthdate:birthdate_obj}
            var new_artist = new Artist(data)
            /*
            Artist.collection.insert(data, (err,result)=>{
                if(err) console.error(err)
                console.log(result)
                res.send(result)
            })*/
            new_artist.save().then((val)=>{
                res.send(val)
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