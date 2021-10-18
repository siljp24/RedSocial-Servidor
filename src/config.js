 const values = require('./values');
 
 
 const config = {
     hostname:'https://social-server-s.herokuapp.com/',
     imageFolder:'./src/statics',
     database:{
         url:`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fx9kc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
     },
     jwt:{
         secret:'613b92e493bc7362a0b7ce76',
     },
     multer:{
         [values.imageFolder](cb){
             cb(null, `./src/statics/${values.imageFolder}`);
         },
         [values.avatarFolder](cb){
             cb(null, `./src/statics/${values.avatarFolder}`);
         }
     }
 };

 module.exports = config;
