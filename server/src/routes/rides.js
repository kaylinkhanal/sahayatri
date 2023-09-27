const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

const RideController = require("../controllers/rides");


router.get("/rides",  RideController.getAllRides);
module.exports = router;
