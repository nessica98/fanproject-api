const router = require('express').Router()
//const mongoose = require('mongoose')
//const upload = require('./multer.config')

const Artist = require('./artist.schema')
const Band = require('./band2.schema')
const moment = require('moment')
const aws = require('aws-sdk')
aws.config.update({
    accessKeyId: 'AKIA3FSNENI7OIZHQC4E',
    secretAccessKey: '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',
    region: 'us-east-1'
})
const urlChange = require('./url.func')
const multer = require('multer')
const multerS3 = require('multer-s3')
const e = require('express')

const s3 = new aws.S3({})
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hjs-bucket-11',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname, mimetype: file.mimetype });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    }),
    fileFilter: (req, file, cb) => {
        console.log('nn',req.body)
        // if(!req.body.artistId) {
        //     cb(null,false)
        //     return cb(new Error('no id'));
        // }
        cb(null,true)
    },
})


//const  = require('./artist.schema')
router.get('/artist/:id', (req, res) => {
    console.log('get /artists')
    const { id } = req.params
    console.log(id)
    Artist.findById(id, (err, Doc) => {
        if (err) {
            res.sendStatus(400)
        } else {
            const bandId = Doc.bandId
            console.log(bandId)
            Band.findById(bandId, (err, Doc_b) => {
                const bandName = Doc_b.bandName
                res.send({ ...Doc._doc, bandName: bandName })
            })
        }
    })
})



router.post('/v2/add', (req, res) => {
    var { artist_name, profile_url, birthdate, artist_band } = req.body
    if (!(artist_name && profile_url && birthdate && artist_band)) {
        res.sendStatus(400)
    }
    console.log(artist_band)
    var artist_band_l;
    if (artist_band === 'SOLO') {
        const birthdate_obj = new Date(birthdate)
        const new_artist = new Artist({ name: artist_name, profile_url: profile_url, birthdate: birthdate_obj })
        new_artist.save(fn = (err, Doc) => {
            if (err) {
                console.error(err)
                res.sendStatus(500)
            }
            res.send(Doc)
            return
        })

    } else {
        Band.find({ bandName: artist_band }, (err, data) => {
            if (err) {
                console.error(err)
                res.sendStatus(500)
            }
            console.log(data)
            artist_band_l = data
            console.log(artist_band_l)
            if (artist_band_l.length < 1) {
                res.status(404).send('Band not exists')
                return
            }
            var new_bandid = artist_band_l[0]._id
            const birthdate_obj = new Date(birthdate)
            console.log({ name: artist_name, profile_url: profile_url, birthdate: birthdate_obj, bandId: new_bandid })
            const new_artist = new Artist({ name: artist_name, profile_url: profile_url, birthdate: birthdate_obj, bandId: new_bandid })
            new_artist.save(fn = (err, Doc) => {
                if (err) {
                    console.error(err)
                    res.sendStatus(500)
                }
                console.log('vefore push', Doc)
                Band.findByIdAndUpdate(Doc.bandId, { $push: { members: Doc._id } }, (err, Doc_res) => {
                    console.log(Doc_res)
                    res.send(Doc_res)
                })
                //res.send(Doc)
            })


        })
    }
})

router.post('/add', (req, res) => {
    //console.log('post /artists/add')
    if (req.body) {
        console.log('post /artists/add')
        var { artist_name, profile_url, birthdate } = req.body
        //console.log(artist_name,profile_url,birthdate)
        if (artist_name && profile_url && birthdate) {
            var birthdate_obj = new Date(birthdate)
            var data = { name: artist_name, profile_url: profile_url, birthdate: birthdate_obj }
            var new_artist = new Artist(data)
            /*
            Artist.collection.insert(data, (err,result)=>{
                if(err) console.error(err)
                console.log(result)
                res.send(result)
            })*/
            new_artist.save().then((val) => {
                res.send(val)
            })
        }
        else res.sendStatus(400)
    } else {
        res.sendStatus(400)
    }
})

router.put('/update-profile-pic', (req, res) => {
    //console.log(req.body)
    if (req.body) {
        // 
        console.log('put /artists/update-profile-pic')
        if (req.body.profilepic && req.body.artist_name) {
            Artist.findOneAndUpdate({ name: req.body.artist_name }, { profile_url: req.body.profilepic }, { new: true }, (err, doc, result) => {
                if (err) console.error(err)
                console.log(doc)
                res.send(doc)
            })
        }
        else res.sendStatus(400);

    } else {
        res.sendStatus(400)
    }
})

router.post('/upload', (req, res, next) => {
    // const {artist_id} = req.body
    // console.log(req.body)
    // if(!artist_id) {
    //     res.sendStatus(400)
    //     return;
    console.log('upload...')
    
    // }
    try {


        upload.single('profile')(req, res, (err) => {
            console.log(req.body)
            const {artistId} = req.body
            console.log('11', req.file)
            if (artistId || req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
                //Artist.findByIdAndUpdate(artist_id,{im})
                Artist.findByIdAndUpdate(artistId, { profile_url: req.file.location }).then((_prod) => {
                    res.sendStatus(201)
                }).catch((err) => {
                    res.sendStatus(304)
                })


            }
            else {
                res.sendStatus(304) // Not update
            }
        })




    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router