var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var User = require("../user/user");
var Parent = require("../parent/parent");
var Child = require("../child/child");

router.post("/login", function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  User.findOne({ idNumber: userId, password: password }, (err, currUser) => {
    if (currUser) {
      const user = {
        _id: currUser._id,
        id: currUser.idNumber,
        name: currUser.name,
      };

      jwt.sign({ user }, "dollarz", (err, token) => {
        if (err) {
          console.log(err);
          res.status(401).send("server error");
        } else {
          res.json({
            token,
          });

          res.status(200).send();
        }
      });
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
    return res.status(500).send("error");
  }
});

// Register new child to the DB
router.post("/registerChild", function (req, res, next) {
  try {
    // Get sender token
    const token = req.headers.authorization.split(" ")[1];

    // Get sender _id
    const senderId = jwt.decode(token).user._id;

    let parentId = "";

    // only parents can register childrens
    Parent.findOne({ userDetails: senderId }, (err, parent) => {
      if (err || parent === undefined) {
        return res.status(401).send("no auth");
      } else {
        parentId = parent._id;
      }
    }).catch((err) => {
      return res.status(401).send("no auth");
    });

    const user = new User({
      idNumber: req.body.id,
      name: req.body.name,
      password: req.body.password,
    });

    user.save().then(() => {
      const child = new Child({
        userDetails: user._id,
        parent: parentId,
        money: "",
        goals: [],
        requests: [],
        gameScore: [],
      });
      child.save().then(res.status(200).send("child created successfully"));
    });
  } catch (err) {
    res.status(500).send("error creating new child");
  }
});

export default router;
