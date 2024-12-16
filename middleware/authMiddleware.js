
// API_AUTH_KEY = '8a60348b-d4a4-564a-9b45-aab518adb7f4'
const validateapikey = (req,res,next) => {
  
  const {api_auth_key} = req.headers;
  if (!api_auth_key){
    return res.status(401).json({
      "message": "Access denied, API_AUTH_KEY is missing"
   })
  }
  if (api_auth_key !== process.env.API_AUTH_KEY){
    return res.status(401).json({
      "message": "Failed to authenticate API_AUTH_KEY"
    })
  }
  next()
}
module.exports = {validateapikey};