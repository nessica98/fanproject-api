const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})


router.post('/one', upload.single('profile'),(req,res)=>{
    const {name} = req.body
    if(!name) {
        res.sendStatus(400);
        return
    }
    console.log(req.file)
    
    fs.writeFileSync('img.jpg', req.file.buffer)
    res.send('complete')
})

module.exports = router