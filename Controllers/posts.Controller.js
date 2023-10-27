const { Posts } = require("../Models/posts.model");
const { DeletedPosts } = require('../Models/DeletePosts.model');
const jwt = require("jsonwebtoken");
const { UpdatedPosts } = require("../Models/UpdatedPosts.model");
require("dotenv").config();


function convertToSEOTitle(title) {
    return title
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();
}
const store = async (req, res) => {
    try {
        const filenames = req.files.map((file) => '/posts/' + file.filename);
        const titleSeo = convertToSEOTitle(req.body.title);
        console.log("title seo", titleSeo);
        let data = {
            title: req.body.title,
            title_seo: titleSeo,
            location: "null",
            media: filenames,
            userId: req.authUserId,
        };

        let savePost = await Posts(data).save();

        res.status(201).send({
            message: "post upload successfully",
            data: savePost,
            value: true,
        });
    } catch (err) {
        console.log(err);
        res.send({
            message: "",
            data: null,
            value: false,
            error: err,
        });
    }
};
const updatePhoto = async (req , res)=>{
        try {
        const filenames = req.files.map((file) => '/posts/' + file.filename);
        const postId = req.body.id ;
        let findPost = await Posts.findById(id);
        let mediaData =  findPost.media ;
        let finalMediaData = [...mediaData , ...filenames ];
        let result = await Posts.updateOne({id: postId} , {  $set: {media: finalMediaData}});
        
        if(!result){
            res.status(500).send({
                message: 'there is an error',
                data: null ,
                value: false ,
            });
        }
        res.status(200).send({
            message: 'success' ,
            value: true ,
            data: result ,
        });

        } catch(err){
            res.status(500).send({
                message: '',
                value: false  ,
                data: null ,
                error: err ,
            });
        }
};
const updatePhotoArray = async (req , res)=>{
    try {
    const postId = req.body.id ;
    
    let finalMediaData = req.body.mediadata;
    let result = await Posts.updateOne({id: postId} , {  $set: {media: finalMediaData}});
    
    if(!result){
        res.status(500).send({
            message: 'there is an error',
            data: null ,
            value: false ,
        });
    }
    res.status(200).send({
        message: 'success' ,
        value: true ,
        data: result ,
    });

    } catch(err){
        res.status(500).send({
            message: '',
            value: false  ,
            data: null ,
            error: err ,
        });
    }
};
const update = async (req, res) => {
    try {
        console.log('title is ' , req.body.title);
        let titleSeo = convertToSEOTitle(req.body.title);
        let userid = req.authUserId;
        let id = req.body.id;
        let data = {
            title: req.body.title,
            title_seo: titleSeo,
            //tags: req.body.tags,
        };
        let findPost = await Posts.findById(id);
        let uploadData = findPost.toObject();
        console.log("d", uploadData);
        delete uploadData._id;
        delete uploadData.__v;
        console.log("d", uploadData);

        let updatedPost = await new UpdatedPosts(uploadData).save();

        let result = await Posts.updateOne({ id: id }, {
            $set: data
        });
        res.status(200).send({
            message: 'updated successfull' , 
            data: result ,
            value: true ,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "",
            data: null,
            value: false,
            error: err,
        });
    }
};

const remove = async (req, res) => {
    try {
        let id = req.body.id;
        let data = await Posts.findById(id);
        console.log("data", data);
        if (data.userId !== req.authUserId) {
            res.send({
                message: "something error in post delete , please find aonce again",
                data: null,
                value: false,
            });
        }
        // delete data._id ; delete data.__v ;

        console.log("enter in upload delete  posts", data);
        let uploadInDeletePost = await DeletedPosts(data.toObject()).save();
        console.log("uploadInDelete ", uploadInDeletePost);
        if (!uploadInDeletePost) {
            res.status(500).send({
                message: "something error in post delete , please find aonce again",
                data: null,
                value: false,
            });
        }
        let deletePost = await Posts.findByIdAndDelete(id);
        console.log(deletePost);
        if (!deletePost) {
            res.status(500).send({
                message: "",
                data: null,
                value: false,
                error: err,
            });
        }

        res.status(200).send({
            message: 'deleted successfully ',
            value: true,
            data: deletePost,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "",
            data: null,
            value: false,
            error: err,
        });
    }
};

const getdata = async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.send({
            message: "",
            data: null,
            value: false,
            error: err,
        });
    }
};

const getalldata = async (req, res) => {
    try {
        let id = req.authUserId;
        let postData = await Posts.find({ 'userId': id });
        res.status(200).send({
            message: "post Uploaded Successfully",
            data: postData,
            value: true,
        });
    } catch (err) {
        console.log(err);
        res.send({
            message: "error found",
            data: null,
            value: false,
            error: err,
        });
    }
};

module.exports = {
    store,
    update,
    getalldata,
    getdata,
    remove,
    updatePhoto , 
    updatePhotoArray ,
};
