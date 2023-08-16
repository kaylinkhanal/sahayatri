const express=require('express')
const router = express.Router()
const multer  = require('multer')
const {addVehicles,getVehiclesByUserId } = require('../controllers/vehicles')
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
router.post('/vehicles',upload.single('vehicleImage'), addVehicles)



router.get('/vehicles/:userId',  getVehiclesByUserId)
module.exports = router


