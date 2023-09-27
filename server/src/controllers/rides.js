const Rides = require("../models/rides");


const getAllRides = async (req, res) => {
  try {
  	const data = await Rides.find({status: req.query.status}).populate('user')
    return	res.json({
      rideList: data
    })
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllRides
};
