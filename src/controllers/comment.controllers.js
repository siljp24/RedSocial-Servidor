const models = require('../models');


const lastestComments = async (req,res) =>{
    try{
        const comments = await models.comment.find().sort({ createdAt: "desc"});
        return res.status(201).json({ comments });
    }catch(err){
        return res.status(409).json(err);
    }
};

const create = async (req,res)=>{
    try{
        const { title, description, userId, postId } = req.body;
        const user = await models.user.findById(userId);
        if(!user){
            return res.status(409).json({ error: 'El usuario no existe'});
        }
        const post = await models.post.findById(postId);
        if(!post){
            return res.status(409).json({ error: 'El post no existe'});
        }
        const comment = await models.comment.create({
            title,
            description,
            user: user._id,
            post: post._id,
        })
        return res.status(201).json({ comment });
    }catch(err){
        return res.status(409).json(err);
    }  
}

module.exports = {
    lastestComments,
    create,
}