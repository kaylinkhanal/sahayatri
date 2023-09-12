const mongoose = require("mongoose");
const RidesSchema = new mongoose.Schema({
    userId:  String,
    riderId: String,
    price: Number,
    distance: Number,
    pickUpAddress: String,
    pickupCoords: Object,
    destinationAddress: String,
    destinationCoords: Object,
    status: {
      type: String,   
      enum: ['pending', 'rideScheduled', 'riderOnHisWay', 'riderPickedUp', 'rideCompleted', 'cancel']
      },
  },{
    timestamps: true
  });
  
  const Rides = mongoose.model('Rides',RidesSchema);
  module.exports = Rides


  
