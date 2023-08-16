const Vehicles= require('../models/vehicles')
const addVehicles = async(req,res)=>{
    await  Vehicles.create(req.body)
    }
   
const getVehiclesByUserId  = async(req,res)=>{
   const data = await Vehicles.findOne({user: req.params.userId})
    res.json({data})
    }
   
   
     module.exports = {addVehicles,getVehiclesByUserId}