const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');



const server = express();

//SETTINGS
server.set('PORT', process.env.PORT ?? 4500);

//MIDDLEWARES
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false}));

//ROUTES
server.use('/api/user', routes.user);
server.use('/api/post', routes.post);
server.use('/api/comment', routes.comment);

//STATIC FOLDER
server.use(express.static(path.join(__dirname, 'statics')))



module.exports = server;