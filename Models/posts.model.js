const mongoose  = require('mongoose');
const { Schema } = mongoose ;



const likeSchema = new Schema({
    username: String ,
    userId : String ,
    createdAt: {
        type: Date ,
        default: Date.now
    },
});
const replyCommentsSchema = new Schema({
    username: String ,
    userId: String ,
    comment: String ,
    createdAt: {
        type: Date ,
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now 
    },
    likes: [likeSchema],
    media: [String]  , 
    
});



const commentsSchema = new Schema({
    username: String ,
    userId: String ,
    comment: String ,
    createdAt: {
        type: Date ,
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now 
    },
    likes: [likeSchema],
    media: [String]  , 
    reply : [replyCommentsSchema],
});


const sharedWithSchema = new Schema({
    sender: String , 
    receivers: [String],
    createdAt: {
        type: Date ,
        default: Date.now
    },
});

const postsSchema = new Schema({
    title: String , 
    title_seo: String ,
    tags: [String] ,
    location: String , 
    media: [String]  , 
    userId: String ,
    likes: [likeSchema],
    comments: [commentsSchema],
    sharedWith: [ sharedWithSchema ] ,
    createdAt: {
        type: Date ,
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default:  Date.now 
    }
});


const Posts = mongoose.model('posts' , postsSchema);


module.exports = {
    Posts,
}