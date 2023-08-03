const Users= require('../models/users')
const registerNewUser = async(req,res)=>{
    //1 user already exist or not?
    await Users.create(req.body)
      res.json({
        msg: 'success'
      })
  }

  module.exports = {registerNewUser}