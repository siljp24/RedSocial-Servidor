const models = require('../models');
const values = require('../values');
const fs = require('fs/promises');
const config = require('../config');
const path = require('path');

const upload = async (req,res)=>{
    try{
        const { title, description, ownerId } = req.body;
        console.log({ title, description, ownerId })
        const user = await models.user.findById(ownerId);
        console.log({ user })
        if(!user){
            return res.status(409).json({ error: 'Usuario no registrado'});
        }
        const hostname = config.hostname;
        const filename = hostname + values.imageFolder + '/' + req.file.filename;
        const post = await models.post.create({
            image:filename,
            title,
            description,
            owner:user,
        })
        return res.status(201).json({ post })
    }catch(err){
        return res.status(409).json(err)
    }
    

};

const recentUploads = async (req, res) =>{
    try{
        const posts = await models.post.find().sort({ createdAt: "desc"});
        res.status(201).json({ posts });
    }catch(err){
        return res.status(409).json(err);
    }
    
};

const stast = async (req,res)=>{
    // obtener nº images, nº vistas, nºcomments y nºlikes
    //hay 2 formas de obtener el recuento: .find() o .countDocuments(). Con .find() sería de la siguiente forma:
        // const images2 = (await models.post.find()).length;
    //para contar el nº de imges es suficiente con contar el nº de post xq todo post tiene una image
    try{
        //contar las images de todo los posts
        const images = await models.post.countDocuments();
        //contar los comentarios de todo los posts
        const comments = await models.comments.countDocuments();
        //contar las vistas de todo los posts
        const countPost = (await models.post.find()).length;
        let views = 0;
        if(countPost > 0){
            const result = await models.post.aggregate([
                {
                    $group:{
                        _id:'1',
                        views: { $sum: '$views'},
                    },
                },
            ]);
            views = result[0].views;
        };
        //contar los likes de todo los posts
        let likes = 0;
        const allPosts = await models.post.find();
        for(const post of allPosts){
            likes = likes + post.likes;
        }
        // if(likes === 0 || likes === null){
        //     likes = 0;
        // }
        console.log({ likes })
        return res.status(201).json({ images, comments, views, likes });
    }catch(err){
        return res.status(409).json(err);
    }
   
};

const mostPopular = async (req, res) =>{
    try{
        const posts = await models.post.find().sort({ views: "desc"}).limit(2);
        return res.status(201).json({ posts });
    }catch(err){
        return res.status(409).json(err);
    }
}

const details = async (req,res)=>{
    try{
        const { postId } = req.params;
        const post = await models.post.findById(postId);
        if(!post){
            return res.status(409).json({ error: 'El post no existe'});
        }
        const comments = await models.comment.find({ postId });
        return res.status(201).json({ post, comments });
    }catch(err){
        return res.status(409).json(err);
    }
    
}

const remove = async (req,res) =>{
    try{
        const { postId } = req.body;
        const post = await models.post.findById(postId);
        if(!post){
            return res.status(409).json({ error: "El post no existe"});
        }
        const imageArray =  post.image.split('/');
        const imageName  = imageArray[imageArray.length -1];
        const rutaImage = path.resolve(`./src/statics/${values.imageFolder}/` + imageName);
        await fs.unlink(rutaImage);
        await models.comment.deleteMany({ post });
        const data = await models.post.findOneAndDelete({ post });
        return res.status(201).json({ data });
    }catch(err){
        return res.status(409).json(err);
    }
}

const like = async (req, res)=>{
    try{
        const { postId } = req.body;
        const post = await models.post.findById(postId);
        if(!post){
            return res.status(409).json({ error: 'El post no encontrado'});
        }
        post.likes += 1;
        await post.save();
        return res.status(201).json({ post });
    }catch(err){
        return res.status(409).json(err);
    }
    res.json('like');
};

const view = async (req, res)=>{
    try{
        const { postId } = req.body;
        const post = await models.post.findByIdAndUpdate(postId,{
            $inc:{ views: 1 }
        },{
            new:true,
        });

        res.json({ post });
    }catch(err){
        return res.status(409).json(err);
    }
    
};

module.exports = {
    upload,
    recentUploads,
    stast,
    mostPopular,
    details,
    remove,
    like,
    view,
}