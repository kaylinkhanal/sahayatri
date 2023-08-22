const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema({
    vehicleNumber: {type: String, unique:true}, 
    vehicleImage: String,
    vehicleCategory: {
      type: String,   
      enum: ['Scooter', 'Bike', 'Car'],
      default: 'Bike'
      },
    user:  String
  });
  
  const Vehicles = mongoose.model('Vehicles',VehicleSchema);
  module.exports = Vehicles
