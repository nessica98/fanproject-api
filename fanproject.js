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
Router.get('/add', (req,res)=>{
    console.log('from add')
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
