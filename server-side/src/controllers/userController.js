var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var User = require("../user/user");
var Parent = require("../parent/parent");

router.post("/login", function (req, res, next) {
  const user = {
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
  };

  // ---ADD HERE CHECK WHETHER THE USER EXIST IN THE DB---

  // Register only existing users
  jwt.sign({ user }, "dollarzJwt", (err, token) => {
    res.json({
      token,
    });
  });
});

// Register new user to the DB
router.post("/register", function (req, res, next) {
  const user = new User({
    idNumber: req.body.id,
    name: req.body.name,
    password: req.body.password,
  });

  try {
    user.save().then(() => {
      const parent = new Parent({
        userDetails: user._id,
        children: [],
        chores: [],
      });
      parent.save().then(res.status(200).send());
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
