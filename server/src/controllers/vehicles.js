const Vehicles = require("../models/vehicles");
const fs = require("fs");
const path = require("path");

const addVehicles = async (req, res) => {
  try {
    req.body.vehicleImage = req.file.filename;
    await Vehicles.create(req.body);
    res.json({
      msg: "Vehicles added!!",
    });
  } catch (err) {
    console.log(err);
  }
};

const getVehiclesByUserId = async (req, res) => {
  const data = await Vehicles.findOne({ user: req.params.userId });
  console.log(data)
  res.json({ data });
};

const getVehicleDetailsById = async (req, res) => {
  const data = await Vehicles.findById(req.params.vehicleId);
  res.json({ data });
};
const getAllVehicles = async (req, res) => {
  const totalCount = await Vehicles.find().count();
  const skipCount = (req.query.page - 1) * req.query.limit;
  const data = await Vehicles.find().limit(req.query.limit).skip(skipCount);
  res.json({ data, totalCount });
};

const getVehicleImageByVehicleId = async (req, res) => {
  try {
    const data = await Vehicles.findById(req.params.vehicleId);
    const vehicleImageDir = path.join(
      __dirname,
      "../../",
      "uploads/vehicles/",
      data.vehicleImage
    );
    const defaultImageDir = path.join(
      __dirname,
      "../../",
      "uploads/vehicles/",
      "default.jpeg"
    );
    if (fs.existsSync(vehicleImageDir)) {
      res.sendFile(vehicleImageDir);
    } else {
      res.sendFile(defaultImageDir);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addVehicles,
  getVehiclesByUserId,
  getVehicleDetailsById,
  getVehicleImageByVehicleId,
  getAllVehicles,
};
