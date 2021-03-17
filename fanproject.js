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
    /*
    const rs = new Set(Object.keys(req.body))
    const rs_comp = ['fanproject_name','fanproject_date','fanproject_type','artist_id','organizerName','fanproject_place']
    console.log(rs)
    rs_comp.forEach((val,ind)=>{
        if(rs.has(val)===false){
            res.sendStatus(400)
        }
    })*/
    const {fanproject_name,fanproject_date,fanproject_type,artist_id,organizerName,fanproject_place} = req.body
    if(!(fanproject_name && fanproject_date && fanproject_type && artist_id && organizerName && fanproject_date)){
        res.sendStatus(400)
    }
    const Fanproject_res = new Fanproject(req.body)
    Fanproject_res.save((err)=>{
        if(err) console.log(err)
        res.send('success')
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
