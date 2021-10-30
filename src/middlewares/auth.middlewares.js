const jwt = require('jsonwebtoken');
const config = require('../config');
const models = require('../models');
const fs = require('fs/promises');
const path = require('path');

const isToken = (req, res, next) => {
    try{
        const token = req.headers.token;
        if(!token){
            return res.status(409).json({ error: 'No existe token'});
        }
        next();
    }catch(err){
        res.status(409).json(err.message);
    }
}

const userExists = async (req, res, next) => {
    try{
        const data = jwt.verify(req.headers.token, config.jwt.secret);
        if(!data){
            if(req.file){
                await  fs.unlink(req.file.path);
            }
            return res.status(409).json({ error: 'El token no existe'});
        }
        const email = data.data.email;
        const user = await models.user.findOne({ email });
        if(!user){
            if(req.file){
                await fs.unlink(req.file.path);
            }
            return res.status(409).json({ error: 'No existe el usuario'});
        }
        req.body.ownerId = user._id;
        next();
    }catch(err){
        if(req.file){
            await fs.unlink(req.file.path);
        }
        return res.status(409).json(err.message);
    }
}

const detailValidation = async (req, res, next) =>{
    try{
        const data = jwt.verify(req.headers.token, config.jwt.secret);
        if(!data){
            return next();
        }
        const email = data.data.email;
        const user = await models.user.findOne({ email });
        if(!user){
            return next();
        }
        req.body.userId = user._id;
        next();
    }catch(err){
        return res.status(409).json({ error: err.message});
    }
}

module.exports = {
    isToken,
    userExists,
    detailValidation,
}