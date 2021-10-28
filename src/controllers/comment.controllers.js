const models = require('../models');


const lastestComments = async (req,res) =>{
    try{
        const comments = await models.comment.find().sort({ createdAt: "desc"});
        const data = [];
        for(const comment of comments){
            const post = await models.post.findById(comment.post);
            const user = await models.user.findById(comment.user);
            data.push({
                _id: comment._id,
                title: comment.title,
                description: comment.description,
                post,
                user,
            })
        }
        return res.status(201).json({ data });
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