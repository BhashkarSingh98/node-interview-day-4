const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const { users } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post(
  "/signup",
  [
    check("email", "please provide a valid email").isEmail(),
    check(
      "password",
      "please provide a valid password is grater then 5"
    ).isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const { password, email } = req.body;

    console.log(password, email);

    //validated the input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //validate if user already exist

    let user = users.find((user) => {
      return user.email === email;
    });
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "this user already exist",
          },
        ],
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedpassword,
    });

    console.log(hashedpassword);

    const token = await JWT.sign({}, "gjkhgyytr67t97tugjhfjhfjiyyr6rrfhfhj78", {
      expiresIn: 3600000,
    });

    res.json({
      token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "invalid credential",
        },
      ],
    });
  }

  let isMatch=await bcrypt.compare(password,user.password)

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: "invalid credential",
        },
      ],
    });
  };


  const token = await JWT.sign({}, "gjkhgyytr67t97tugjhfjhfjiyyr6rrfhfhj78", {
    expiresIn: 3600000,
  })
  res.json({
    token,
  });
  


});
router.get("/all", (req, res) => {
  res.json(users);
});
module.exports = router;
