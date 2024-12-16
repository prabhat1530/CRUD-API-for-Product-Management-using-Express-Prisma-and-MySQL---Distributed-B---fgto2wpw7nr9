 const authKey = "8a60348b-d4a4-564a-9b45-aab518adb7f4"
const authMiddleware = (req, res, next)=>{
  const {apiauthkey}  = req.headers; 
  console.log(req.headers)
 
  if(!apiauthkey){
      return res.status(401).json({ 
          "message": "Access denied, apiauthkey is missing"
       })
  }
  if(apiauthkey!=authKey){
      return res.status(401).json({ 
          "message": "Failed to authenticate apiauthkey"
        })
  }
  next()
}

module.exports = authMiddleware;