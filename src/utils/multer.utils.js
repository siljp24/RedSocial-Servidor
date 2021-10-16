const multer = require('multer');
const config = require('../config');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        config.multer[file.fieldname](cb);
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '.jpeg');
    },
});

const uploads = multer({
    // dest:'./src/statics',
    storage: storage,
    limits:{
        fileSize:100000,
    },
});

module.exports = uploads;