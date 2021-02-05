var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var User = require("./user");
var Parent = require("../parent/parent");
var Child = require("../child/child");
const signUserToJwt = (personId, currUser, res) => {
  var userObj = {
    _id: personId._id,
    id: currUser.idNumber,
    name: currUser.name,
  };

  jwt.sign(userObj, "dollarz#jwt", (err, token) => {
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
};

router.post("/login", function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;

  User.findOne({ idNumber: userId, password: password })
    .then((currUser) => {
      // Check if parent
      Parent.findOne({ userDetails: currUser._id }, "_id", (err, parentId) => {
        if (parentId) {
          return signUserToJwt(parentId, currUser, res);
        } else {
          // check if child
          Child.findOne({ userDetails: currUser._id }, "_id").then((childId) => {
            if (childId) {
              return signUserToJwt(childId, currUser, res);
            }
          });
        }
      });
    })
    .catch((err) => {
      res.status(401).send("user does not exist");
    });
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
