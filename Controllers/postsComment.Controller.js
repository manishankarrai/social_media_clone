const { Posts } = require("../Models/posts.model");

const uploadComment = async (req, res) => {
  try {
    console.log("inter in upload comment");
    if (req.files && req.files.length > 0) {
      let filenames = req.files.map(
        (file) => "/posts/comments/" + file.filename
      );
    }
    console.log("filename ", filenames);
    let data = {
      username: req.body.username,
      userId: req.body.userId,
      comment: req.body.comment,
      media: filenames,
    };
    let ids = {
        postId : req.body.postId,
    }

    if (! ids.postId) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    let findPost = await Posts.findById(ids.postId);
    console.log("post ", findPost);

    findPost.comments.push(data);
    console.log("comments ", commentData);
    let result = await findPost.save();
    console.log("onsole.result ", result);
    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "comment posted",
      value: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};
const removeComment = async (req, res) => {
  try {
    let data = {
      postId: req.body.postId,
      commentId: req.body.commentId,
    };
    let targetPost = await Posts.findById(data.postId);
    let commentIndex = targetPost.comments.findIndex(
      (item) => item._id === data.commentId
    );
    if (commentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    targetPost.comments.splice(commentIndex, 1);
    let result = await targetPost.save();

    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "comment posted",
      value: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};

const likeComment = async (req, res) => {
  try {
    let data = {
      postId: req.body.postId,
      commentId: req.body.commentId,
      username: req.body.username,
      userId: req.authUserId,
    };
    let targetPost = await Posts.findById(data.postId);
    let commentIndex = targetPost.comments.findIndex(
      (item) => item._id === ids.commentId
    );
    if (commentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    targetPost.comments[commentIndex].likes.push({
      username: data.username,
      userId: data.userId,
    });
    let result = await targetPost.save();
    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};
const updateComment = async (req, res) => {
  try {
    console.log("inter in upload comment");
    let filenames = req.files.map((file) => "/posts/comments/" + file.filename);
    console.log("filename ", filenames);
    //  let filename =  req.file.filename ;
    let data = {
      username: req.body.username,
      userId: req.authUserId,
      comment: req.body.comment,
      media: filenames,
    };
    let ids = {
      postId: req.body.postId,
      commentID: req.body.commentID,
    };

    console.log("post id ", ids);

    if (!ids.postId) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    let targetPost = await Posts.findById(ids.postId);
    console.log("post ", targetPost);
    let commentIndex = targetPost.comments.findIndex(
      (item) => item._id === ids.commentId
    );
    if (commentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    targetPost.comments.splice(commentIndex, 1, data);
    let result = await targetPost.save();
    console.log("onsole.result ", result);
    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "comment updated",
      value: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};

//child comments section start

const uploadChildComment = async (req, res) => {
  try {
    console.log("inter in upload comment");
    let filenames = req.files.map((file) => "/posts/comments/" + file.filename);
    console.log("filename ", filenames);
    let data = {
      username: req.body.username,
      userId: req.authUserId,
      comment: req.body.comment,
      media: filenames,
    };
    let ids = {
      postId: req.body.postId,
      commentId: req.body.commentID,
    };
    if (!postId) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    let targetPost = await Posts.findById(postId);
    console.log("post ", findPost);
    let childCommentIndex = targetPost.comments.findIndex(ids.commentId);
    targetPost.comments[childCommentIndex].reply.push(data);

    let result = await findPost.save();
    console.log("onsole.result ", result);
    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "comment posted",
      value: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};
const removeChildComment = async (req, res) => {
  try {
    let data = {
      postId: req.body.postId,
      commentId: req.body.commentId,
      childCommentId: req.body.childCommentId,
    };
    let targetPost = await Posts.findById(data.postId);
    let parentCommentIndex = targetPost.comments.findIndex(
      (item) => item._id === data.commentId
    );
    if (parentCommentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    let childCommentIndex = targetPost.comments[
      parentCommentIndex
    ].reply.findIndex((item) => item._id === data.childCommentId);

    if (childCommentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    targetPost.comments[parentCommentIndex].reply.splice(childCommentIndex, 1);
    let result = await targetPost.save();

    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "comment posted",
      value: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};

const likeChildComment = async (req, res) => {
  try {
    let data = {
      username: req.body.username,
      userId: req.authUserId,
    };
    let ids = {
      postId: req.body.postId,
      commentId: req.body.commentId,
      childCommentId: req.body.childCommentId,
    };

    let targetPost = await Posts.findById(ids.postId);
    let parentCommentIndex = targetPost.comments.findIndex(
      (item) => item._id === ids.commentId
    );
    if (parentCommentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    let childCommentId = targetPost.comments[
      parentCommentIndex
    ].reply.findIndex((item) => item._id === ids.childCommentId);

    targetPost.comments[parentCommentIndex].reply.splice(
      childCommentId,
      1,
      data
    );

    let result = await targetPost.save();
    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};
const updateChildComment = async (req, res) => {
  try {
    console.log("inter in upload comment");
    let filenames = req.files.map((file) => "/posts/comments/" + file.filename);
    console.log("filename ", filenames);
    //  let filename =  req.file.filename ;
    let data = {
      username: req.body.username,
      userId: req.authUserId,
      comment: req.body.comment,
      media: filenames,
    };
    let ids = {
      postId: req.body.postId,
      commentId: req.body.commentId,
      childCommentId: req.body.childCommentId,
    };
    if (!ids.postId) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    let targetPost = await Posts.findById(ids.postId);
    let parentCommentIndex = targetPost.comments.findIndex(
      (item) => item._id === ids.commentId
    );

    let childCommentIndex = targetPost.comments[
      parentCommentIndex
    ].reply.findIndex((item) => item._id === ids.childCommentId);

    if (commentIndex === -1) {
      res.status(400).send({
        message: "comment not found ",
        value: false,
        data: null,
      });
    }
    targetPost.comments[parentCommentIndex].reply.splice(
      childCommentIndex,
      1,
      data
    );

    let result = await targetPost.save();
    console.log("onsole.result ", result);
    if (!result) {
      res.status(500).send({
        message: "upload failed",
        value: false,
        data: null,
      });
    }
    res.status(200).send({
      message: "comment updated",
      value: true,
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed",
      value: false,
      data: null,
      error: err,
    });
  }
};

module.exports = {
  uploadComment,
};
