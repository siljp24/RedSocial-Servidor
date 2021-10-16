const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    image:{
        type: String,
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    likes:{
        type: Number,
        default: 0,
    },
    views:{
        type: Number,
        default: 0,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model('Post', postSchema);