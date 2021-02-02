var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var User = require("./user");
var Parent = require("../parent/parent");
var Child = require("../child/child");

router.post("/login", function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  const currUser = User.findOne({ idNumber: userId }, (err, docs) => {
    if (docs && docs.password === password) {

      const user = {
        id: currUser.idNumber,
        name: currUser.name,
      };

      jwt.sign({ user }, "dollarzJwt", (err, token) => {
        res.json({
          token,
        });
      }).then(res.status(200).send());
    } else return res.status(401).send("user does not exist");
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
