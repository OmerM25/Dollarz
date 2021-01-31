var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var User = require("../user/user");
var Parent = require("../parent/parent");
var Child = require("../child/child");

router.post("/login", function (req, res, next) {
  // const user = {
  //   id: req.body.id,
  //   name: req.body.name,
  //   password: req.body.password,
  // };

  const user = {
    // DONT FORGET ---- get _id From DB! ----
    id: "315996660",
    name: "sapir",
    password: "123",
  };

  // ---ADD HERE CHECK WHETHER THE USER EXIST IN THE DB---

  // Register only existing users
  jwt.sign({ user }, "dollarzJwt", (err, token) => {
    res.json({
      token,
    });
  });
});

// Register new parent to the DB
router.post("/registerParent", function (req, res, next) {
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

// Register new child to the DB
router.post("/registerChild", function (req, res, next) {
  const user = new User({
    idNumber: req.body.id,
    name: req.body.name,
    password: req.body.password,
  });

  // Get parent token
  const token = req.headers.authorization.split(" ")[1];

  // Get parent _id
  const parentId = jwt.decode(token).user._id;

  try {
    user.save().then(() => {
      const child = new Child({
        userDetails: user._id,
        parent: parentId,
        money: "",
        goals: [],
        requests: [],
        gameScore: [],
      });
      child.save().then(res.status(200).send());
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
