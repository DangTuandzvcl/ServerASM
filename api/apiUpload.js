var express = require('express')
var router = express.Router();
const upload = require("../config/upload");


router.get('/testUpload', function (req, res, next) {
  res.send('respond with a testUpload');
});

router.post("/mulUpload", upload.array('images', 5), async(req, res) =>{
    try {
        const {files} = req
        const urlImage = files.map((file) => `${req.get('host')}/uploads/${file.filename}`)
        console.log(urlImage)
    } catch (error) {
        console.error(error);     
    }
})

module.exports = router;