const router = require("express").Router();
const { publicpost, privatepost } = require("../db");
const checkauth=require("../middleware/checkauth")


router.get("/public", (req, res) => {
  res.json(publicpost);
});

router.get("/private",checkauth,(req,res,next)=>{
    res.json(privatepost);
});

module.exports = router;

//     let userValid=true;
//     if(userValid){
//         next();
//     }
//     else{
//         return res.status(400).json({
//             errors: [
//                 {
//                   msg: "access D",
//                 },
//               ],
//         })

//     }
// }, (req, res) => {