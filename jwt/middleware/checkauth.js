const JWT=require("jsonwebtoken");


module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      "errors": [
        {
          "msg": "msg:no token found",
        }
      ]
    })
  }

  try{

      let user=await JWT.verify(token,"gjkhgyytr67t97tugjhfjhfjiyyr6rrfhfhj78");
      req.user=user.email;
      next();
  }catch(error){
    return res.status(400).json({
        errors: [
          {
            msg: " token invalid",
          }
        ]
      })
  }

}
