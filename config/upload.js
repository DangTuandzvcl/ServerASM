const multer = require("multer");
const _storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({
    storage: _storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
})

// Upload single file
module.exports = upload