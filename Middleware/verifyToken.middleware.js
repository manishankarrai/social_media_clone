const jwt = require("jsonwebtoken");
const { User } = require("../Models/User.model");
const { Admin } = require("../Models/Admin.model");
require("dotenv").config();

const verifyUserToken = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authtoken) {
      console.log("headers have");
      jwt.verify(
        req.headers.authtoken,
        process.env.SECRET,
        function (err, decode) {
          if (err) {
            res.status(401).send({
              message: " error found , please login once again",
              value: false,
              data: null,
              accessToken: null,
              error : err,
            });
          }

          let user = User.findById(decode.id);
          if (!user) {
            res.status(401).send({
              message: " error found , please login once again",
              value: false,
              data: null,
              accessToken: null,
            });
          }
          req.authUserId = decode.id ;
          next();
        }
      );
    } else {
      console.log("else token");
      res.status(401).send({
        message: " error found , please login once again",
        value: false,
        data: null,
        accessToken: null,
      });
    }
  } catch (err) {
    console.log("err");
    res.status(401).send({
      message: "please login once again",
      value: false,
      data: null,
      accessToken: null,
      error: err,
    });
  }
};

const verifyAdminToken = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authtoken) {
      console.log("headers have");
      jwt.verify(
        req.headers.authtoken,
        process.env.SECRET,
        function (err, decode) {
          if (err) {
            res.status(401).send({
              message: " error found , please login once again",
              value: false,
              data: null,
              accessToken: null,
            });
          }
          let tokenId = decode.id;
          if (!tokenId) {
            res.status(401).send({
              message: " error found , please login once again",
              value: false,
              data: null,
              accessToken: null,
            });
          }
          let admin = Admin.findById();
          if (!admin) {
            res.status(401).send({
              message: " error found , please login once again",
              value: false,
              data: null,
              accessToken: null,
            });
          }
          next();
        }
      );
    } else {
      console.log("else ");
      res.status(401).send({
        message: " error found , please login once again",
        value: false,
        data: null,
        accessToken: null,
      });
    }
  } catch (err) {
    console.log("err");
    res.status(401).send({
      message: "please login once again",
      value: false,
      data: null,
      accessToken: null,
      error: err,
    });
  }
};



module.exports = {
  verifyUserToken, verifyAdminToken,
}