 const values = require('./values');
 
 
 const config = {
     imageFolder:'./src/statics',
     database:{
         url:'mongodb://localhost/redsocial',
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
