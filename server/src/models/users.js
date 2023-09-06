const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: String, // String is shorthand for {type: String}
    phoneNumber: Number,
    password: String,
    role: {
      type: String,   
      enum: ['rider', 'passenger', 'admin'],
      default: 'passenger'
      },
    isVerifiedRider: Boolean
 
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users
