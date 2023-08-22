const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerNewUser = async (req, res) => {
  //1 if phoneNumber already exists
  const matched = await Users.exists({ phoneNumber: req.body.phoneNumber });
  if (matched) {
    res.status(409).json({
      msg: "User Already Exists",
    });
  } else {
    //encrypt the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    await Users.create(req.body);
    res.status(201).json({
      msg: "User created successfully",
    });
  }
};

const loginUser = async (req, res) => {
  //req.body -> phoneNumber, password
  const data = await Users.findOne({
    phoneNumber: req.body.phoneNumber,
  }).lean();
  if (data) {
    const isMatched = await bcrypt.compare(req.body.password, data.password);
    if (isMatched) {
      const { password, ...userDetails } = data;
      //token generating logic
      const token = jwt.sign(
        { phoneNumber: req.body.phoneNumber },
        process.env.SECRET_KEY
      );
      res.json({
        success: true,
        token,
        userDetails,
      });
    } else {
      res.json({
        success: false,
        msg: "Incorrect login credentials",
      });
    }
  } else {
    res.json({
      success: false,
      msg: "No User Found",
    });
  }
  //1. phoneNumber
  //2. phonenumber user -> NO: 'no user found'
  //-> YES: compare pass (db.hashpas ---- req.body.password)
  //No: 'Incorrect email or password'
  //Yes: generate a token
  // res.json({token, ...})
};

const switchUserMode = async (req, res) => {
  try {
    const id = req.params.userId;
    // Searching user with his/her phone number
    const role = req.body.role;

    // if admin is given in the body, send a fail response
    if (role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Only riders and users can be switched!",
      });
    }

    // if everthing is valid, update the user role
    const user = await Users.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
        runValidators: true,
      }
    );

    // if no any user found with the given id, return fail message
    if (!user)
      return res.status(404).json({
        success: false,
        message: "No user associated with that phone number found!",
      });

    // Switch the role of user

    // if everthing went well, send response of success and with user details
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message.startsWith("Cast")
        ? "No user found with the given id!"
        : err.message,
    });
  }
};

module.exports = { registerNewUser, loginUser, switchUserMode };
