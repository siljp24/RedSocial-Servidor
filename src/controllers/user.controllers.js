const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config');
const values = require('../values');



const signUp = async (req,res) => {
    try{
        const { email, password } = req.body;
        const file = req.file;
        const hostname = config.hostname;
        const hash = await models.user.encrypt(password);
        const user = {
            avatar:hostname + values.avatarFolder + '/' + file.filename,
            email,
            password:hash,
        };
        const data = await models.user.create(user);
        return res.status(201).json({ data });
    }catch(err){
        return res.status(409).json({ err })
    }
}

const signIn = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await models.user.findOne({ email });
        if(!user){
            return res.status(409).json({ error: 'Usuario no encontrado' });
        }
        const compare = await models.user.compare(password, user.password);
        if(!compare){
            return res.status(409).json({ error: 'Usuario no encontrado'});
        }
        const data = {
            email: user.email,
        }
        const token = jwt.sign({ data }, config.jwt.secret);
        return res.status(201).json({ token, avatar: user.avatar, email })
    }catch(err){
        return res.status(409).json({ err });
    }
}

module.exports = {
    signUp,
    signIn,
}