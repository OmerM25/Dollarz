var express = require("express");
var jwt = require("jsonwebtoken");

var router = express.Router();

router.post("/login", function (req, res, next) {
  const user = {
    name: "sapir",
    email: "12@gmail.com",
  };

  // ---ADD HERE CHECK WHETHER THE USER EXIST IN THE DB---

  // Register only existing users
  jwt.sign({ user }, "dollarzJwt", (err, token) => {
    res.json({
      token,
    });
  });
});

export default router;
