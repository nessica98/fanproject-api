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

})
module.exports = router
