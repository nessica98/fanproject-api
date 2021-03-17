const router = require('express').Router()
//const mongoose = require('mongoose')

const Band = require('./band2.schema')

router.get('/', (req,res)=>{
    Band.find((err,data)=>{
        if (err) {
            console.error(err)
            res.sendStatus(500)
        }
        res.send(data)
    })
})

router.post('/add',(req,res)=>{
    const {bandName,debut_date,bandProfilePicURL} = req.body

    const new_band = new Band({bandName:bandName,debut_date:new Date(debut_date),bandProfilePicURL:bandProfilePicURL,members:[]})
    new_band.save((err,prod)=>{
    if(err) console.error(err)
    console.log(prod)
    //mongoose.disconnect()
})
})
module.exports = router
