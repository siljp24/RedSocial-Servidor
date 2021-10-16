const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.database.url)
    .then(()=> console.log('Base Datos conectada'))
    .catch((err)=> console.log(err));