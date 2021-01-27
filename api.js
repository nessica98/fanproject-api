const router = require('express').Router()
const bodyps = require('body-parser')
const request = require('request')
const moment = require('moment')

router.use(bodyps.json())
const d_day = require('./D_day') 
const artists = require('./artist2')
const fanproject = require('./fanproject')
const band = require('./band')

const Artist = require('./artist.schema')

var hostname
const get_hostname = (req,res,next)=>{
 hostname = req.hostname
    console.log(hostname)
    next()
}

const year = moment().year()
console.log(year)
router.use(get_hostname)
router.get('/',(req,res)=>{
    console.log(hostname)
    console.log('get /')
    res.send('hello world');
})

router.get('/artist',(req,res)=>{
    console.log('get /artist')
    Artist.find((err,result)=>{
        if(err) { console.log(err) }
        else {
            //console.log(result)
            result = result.filter((val,index)=>{
                //console.log('debug',val._doc.birthdate)
                return val._doc.birthdate
            })
            res.send(result)
        }
    })
    //res.send('hello world');
    
})

router.get('/dday/coming', (req,res)=>{
    console.log('get /dday/coming')
    request(`http://${hostname}:${process.env.PORT}/artist`, (err,resp,body)=>{
        console.error('error:', err); // Print the error if one occurred
        console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        body = JSON.parse(body)
        //console.log(typeof body)
        var d_dayArr = body.map((val)=>{
            var bd = new Date(val.birthdate)
            
            var bd_month = bd.getMonth()
            var bd_day = bd.getDate()
            var date_string = `${bd_day} ${bd_month+1} ${year}`
            var duration = d_day(date_string)
            console.log(val.name,duration)
            if(duration>152) {
                date_string = `${bd_day} ${bd_month+1} ${year+1}`
                console.log(date_string)
                 duration = d_day(date_string)
                return {...val,"dday":duration,ref_year:year+1}
            }
            else if(duration<=-244){
                date_string = `${bd_day} ${bd_month+1} ${year-1}`
                duration = d_day(date_string)
                return {...val,"dday":duration,ref_year:year-1}
            }else return {...val,"dday":duration,ref_year:year}
        })
        //d_dayArr = d_dayArr.filter((val)=>{return val.dday<=0})
        d_dayArr = d_dayArr.sort((a,b)=> b.dday - a.dday) // decending sort
        res.send(d_dayArr)
    })
})


router.use('/artists', artists)
router.use('/fanproject', fanproject)
router.use('/band',band)

module.exports = router;