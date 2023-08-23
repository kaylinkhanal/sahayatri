const express=require('express')
const router = express.Router()
const multer  = require('multer')
const VehicleController = require('../controllers/vehicles')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/vehicles')
    },
    filename: function (req, file, cb) {
        const imageName =   Date.now() + file.originalname
      cb(null, imageName )
    }
  })
  
  const upload = multer({ storage: storage })
router.post('/vehicles',upload.single('vehicleImage'), VehicleController.addVehicles)
router.get('/vehicles',  VehicleController.getAllVehicles)
// router.get('/vehicles/:vehicleId',  VehicleController.getVehicleDetailsById)


router.get('/vehicle-image/:userId',  VehicleController.getVehicleImageByVehicleId)


router.get('/vehicles/:userId',  VehicleController.getVehiclesByUserId)
module.exports = router


