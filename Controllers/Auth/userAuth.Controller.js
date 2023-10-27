const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../Models/User.model");
require("dotenv").config();

const register = async (req, res) => {
  try {
    let profileUrl = "/user/" + req.file.filename;
    let userdata = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      profilePicture: profileUrl,
    };
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    userdata.password = hashedPassword;
        console.log('data hashed' , userdata.password);
    let checkUser = await User.find({ email: userdata.email });
    if (!checkUser) {
      res.send({
        message: "a user already register with this email.",
        data: null,
        value: false,
      });
    } else {
      let checkPassword = await User.find({ password: userdata.password });
      if (!checkPassword) {
        res.send({
          message: "password is too weak please choose another password",
          data: null,
          value: false,
        });
      }
      console.log('inter into user created' , userdata);
      let createUser = await new User(userdata).save();
      console.log('user create ',createUser);
      let token = jwt.sign({
        id: userdata.id 
      } , process.env.SECRET , {
        expiresIn: 60*60*24*1000 ,
      });
      res.status(201).send({
        message: "Account Create Successfully",
        data: createUser,
        value: true,
        accessToken: token ,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "error found , please try again",
      data: null,
      value: false,
      error: err,
    });
  }
};

//
const login = async (req, res) => {
  try {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(data);
    let userdata = await User.findOne({ email: data.email });
    console.log('user data ',userdata);
    if (!userdata) {
      res.status(400).send({
        message: "Email or password is incorrect",
        data: null,
        value: false,
      });
    } else {
      let passwordCheck = await bcrypt.compare(
        data.password,
        userdata.password
      );
      if (!passwordCheck) {
        res.status(400).send({
          message: "Email or password is incorrect",
          data: null,
          value: false,
        });
      }
      console.log('token assign');
      let token = jwt.sign({
        id: userdata.id 
      } , process.env.SECRET , {
        expiresIn: 60*60*24*1000 ,
      });
      console.log("token assign " , token);

      res.status(200).send({
        message: 'login successfull',
        data: userdata ,
        value: true ,
        accessToken: token,

      });
    }
  } catch (err) {
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
    login , register ,
}