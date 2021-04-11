const Router = require('express').Router()
const mongoose = require('mongoose');
const Artist = require('./artist.schema');

const Fanproject = require('./fanproject.schema')
const FanprojectPlace = require('./fanprojectplace.schema')

// Return all data for show in index place
Router.get('/', (req, res) => {
    console.log('get all event')
    Fanproject.find({}, 'fanproject_name', (err, data) => {
        if (err) { console.log(err) }
        res.send(data)
    })
})

Router.get('/full', async (req, res) => {
    console.log('get all event')
    const raw_data = await Fanproject.find().lean()
    const fanproject_place = await FanprojectPlace.find().select('fanprojectplace_name').lean()
    const artist_data = await Artist.find().lean()
    console.log(fanproject_place)
    fp_map = {}
    arr_map = {}
    fanproject_place.forEach((val,idx)=>{
        fp_map[val._id] = val.fanprojectplace_name
    })
    artist_data.forEach((val,idx)=>{
        arr_map[val._id] = val.profile_url
    })
    console.log(fp_map)
    console.log(arr_map)
    raw_data.forEach((val,idx)=>{
        //console.log(val['fanproject_placeId'])
        raw_data[idx]['fanprojectplace_name'] = fp_map[val['fanproject_placeId']]
        const arr_pic = val.artistId.IdList.map((val1)=>{
            return arr_map[val1]
        })
        raw_data[idx]['artist_pics'] = arr_pic
        
    })
    res.send(raw_data)
})


Router.post('/add', async (req, res) => {
    const {
        fanproject_name,
        fanproject_date,
        fanproject_type,
        artistId,
        organizerName,
        organizerTwitter,
        fanprojectTwitter,
        fanprojectPlaceId
    } = req.body
    const session = await Fanproject.startSession()
    console.log(artistId)
    try {
        const { fanproject_startdate, fanproject_enddate } = fanproject_date
        if(new Date(fanproject_startdate) > new Date(fanproject_enddate)){
            res.sendStatus(400)
            return
        }
        
        if(!artistId || !artistId.IdList || !Array.isArray(artistId.IdList)){
            res.sendStatus(400)
            return
        }
        const { twitterAcc, twitterHashTag } = fanprojectTwitter
        fanprojectTwitter.twitterHashTag = fanprojectTwitter.twitterHashTag.toLowerCase()
    } catch {
        res.sendStatus(400);
        return
    }
    if (!(fanproject_name && fanproject_type && organizerName)) {
        res.sendStatus(400)
        return
    }
    
    // if(!(fanproject_startdate && fanproject_enddate)) {
    //     res.sendStatus(500)
    // }
    
    try {
        await session.withTransaction(async()=>{

            const Fanproject_res = new Fanproject({
                fanproject_name: fanproject_name,
                fanproject_date: fanproject_date,
                fanproject_type: fanproject_type,
                organizer: {
                    organizerName: organizerName,
                    organizerTwitter: organizerTwitter ? organizerTwitter : null
                },
                fanprojectContact: fanprojectTwitter,
                fanproject_date: fanproject_date,
                artistId: artistId,
                fanproject_placeId: fanprojectPlaceId
            })

            const result = await Fanproject_res.save()
            res.send({ addStatus: true, result: result })
        })
        
    }
    catch (e) {
        res.status(500).send(e)
    }finally {
        session.endSession();
    }
    // result.session(session)
    //res.send('success')
})
Router.get('/:id', (req, res) => {
    console.log('get by id')
    const id = req.params.id
    console.log(id)

    Fanproject.findById(id, (err, data) => {
        if (err) { res.sendStatus(400) }
        res.send(data)
    })
})


module.exports = Router
