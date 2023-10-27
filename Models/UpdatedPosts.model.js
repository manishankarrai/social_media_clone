const mongoose  = require('mongoose');
const { Schema } = mongoose ;


const commentsSchema = new Schema({
    username: String ,
    comment: String ,
    createdAt: Date,
    updatedAt: Date,
    likes: Number,
    media: [String]  , 
});

const sharedWithSchema = new Schema({
    sender: String , 
    receivers: [String],
});

const updatedSchema = new Schema({
    title: String , 
    title_seo: String ,
    tags: [String] ,
    location: String , 
    media: [String]  , 
    userId: String ,
    likes: Number,
    comments: [commentsSchema],
    sharedWith: sharedWithSchema ,
    insertedAt: {
        type: Date ,
        default: Date.now
    },
    createdAt: Date,
    updatedAt: Date,
   
});


const UpdatedPosts = mongoose.model('updatedposts' , updatedSchema);


module.exports = {
    UpdatedPosts,
}