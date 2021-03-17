const Router = require('express').Router()

const Fanproject = require('./fanproject.schema')

// Return all data for show in index place
Router.get('/', (req,res)=>{
    console.log('get all event')
    Fanproject.find({},'fanproject_name', (err,data)=>{
        if(err) {console.log(err)}
        res.send(data)
    })
})
Router.post('/add', (req,res)=>{
    const {
        fanproject_name,
        fanproject_date,
        fanproject_type, 
        artistId,
        organizerName,
        organizerTwitter
    } = req.body
    try {
    const {fanproject_startdate, fanproject_enddate} = fanproject_date
    } catch {

    }
    // if(!(fanproject_name && fanproject_startdate && fanproject_enddate && fanproject_type && organizerName)) {
    //     res.sendStatus(500)
    //     return
    // } 
    // if(!(fanproject_startdate && fanproject_enddate)) {
    //     res.sendStatus(500)
    // }
    const Fanproject_res = new Fanproject(req.body)
    Fanproject_res.save((err,prod)=>{
        if(err) { 
            console.error(err.errors)
            res.sendStatus(400)
            return
        }
        res.send({status:true, new_data:prod})
    })
    //res.send('success')
})
Router.get('/:id', (req,res)=>{
    console.log('get by id')
    const id = req.params.id
    console.log(id)
    
    Fanproject.findById(id, (err,data)=>{
        if(err) {res.sendStatus(400)}
        res.send(data)
    })
})


module.exports = Router
