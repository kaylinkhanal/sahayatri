const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=> {
    const token = req.headers?.authorization?.split(' ')?.[1]
    if(!token){
      res.status(401).json({
        msg: "Un-authorized"
      })
    }
    const isValidToken =  jwt.verify(token, process.env.SECRET_KEY );
    if(isValidToken){
        next()
    }else{
      res.status(401).json({
        msg: "Invalid or expired token"
      })
    }
  }

  module.exports  = verifyToken