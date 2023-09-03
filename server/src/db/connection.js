const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const res = await mongoose.connect("mongodb://127.0.0.1:27017/sahayatriDb");
    if (res) console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
