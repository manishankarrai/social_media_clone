const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../../Models/Admin.model");
require("dotenv").config();

const register = async (req, res) => {
  try {
    let profileUrl = "/admin/" + req.file.filename;
    let admindata = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      profilePicture: profileUrl,
    };
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    admindata.password = hashedPassword;
        console.log('data hashed' , admindata.password);
    let checkAdmin = await Admin.find({ email: admindata.email });
    if (!checkAdmin) {
      res.send({
        message: "a admin already register with this email.",
        data: null,
        value: false,
      });
    } else {
      let checkPassword = await Admin.find({ password: admindata.password });
      if (!checkPassword) {
        res.send({
          message: "password is too weak please choose another password",
          data: null,
          value: false,
        });
      }
      console.log('inter into admin created' , admindata);
      let createAdmin = await new Admin(admindata).save();
      console.log('admin create ',createAdmin);
      let token = jwt.sign({
        id: admindata.id 
      } , process.env.SECRET , {
        expiresIn: 60*60*24*1000 ,
      });
      res.status(201).send({
        message: "Account Create Successfully",
        data: createAdmin,
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
    let admindata = await Admin.findOne({ email: data.email });
    console.log('admin data ',admindata);
    if (!admindata) {
      res.status(400).send({
        message: "Email or password is incorrect",
        data: null,
        value: false,
      });
    } else {
      let passwordCheck = await bcrypt.compare(
        data.password,
        admindata.password
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
        id: admindata.id 
      } , process.env.SECRET , {
        expiresIn: 60*60*24*1000 ,
      });
      console.log("token assign " , token);

      res.status(200).send({
        message: 'login successfull',
        data: admindata ,
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