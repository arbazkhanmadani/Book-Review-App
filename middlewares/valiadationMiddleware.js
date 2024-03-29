const jwt = require('jsonwebtoken'); 


const TokenValidation = async (req, res, next)=>{

  
    const Authorization = req.headers['authorization']
    const id = req.headers['_id']
    
    console.log(Authorization + " ===========auth")
    console.log(id + " ===========auth")
    

    if(!Authorization){
      return res.status(403).json({"status":"failed","message":"Token is required"})
    }

    try{

      const tokenDecoded = jwt.verify(Authorization, process.env.JWT_TOKEN)
      if(tokenDecoded) return next()
    }catch(err){
      return res.status(403).json({"status":"failed","message":"authentication failed", "error":err})
    }
   
  //next();
} 

module.exports = TokenValidation