import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized - no token provided"
        });
    }

  try {

  const decoded =  jwt.decode(token,config.jwtSecret);

  if(!decoded){
    return res.status(401).json({
        success:false,
        message:"Unauthorized - invalid token"
    })
  }

  req.userId = decoded.userId;
  next()

  } catch (error) {
    console.log("Error: ---  In verifying Token", error);
    return res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
  }
};

