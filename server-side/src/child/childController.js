var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var Child = require("./child");
var Parent = require("../parent/parent");
const User = require("../user/user");

// Get the money a child has
router.get("/money", function (req, res, next) {
  // Get sender token
  const token = req.headers.authorization.split(" ")[1];

  // Get sender _id
  const sender = jwt.decode(token).user;

  console.log("sender ", sender);
  console.log("req.body.child ", req.body.child);

  let childObj = new Child();

  // If the child is the sender of the request
  if (req.body.child === sender.id) {
    Child.findOne({ userDetails: sender._id }, "money", (err, child) => {
      console.log("step 1");
      if (err || !child) {
        res.status(500).send("child doesnt exist");
      } else {
        console.log("child is - ", child);
        res.status(200).send(child);
      }
    });
  } else {
    // Check that the sender has authorization (give auth to his parent only)
    Parent.findById({ userDetails: sender._id }, (err, parent) => {
      console.log("step 2");
      if (err || !parent) {
        res.status(500).send("no authorization");
      }
      console.log("parent.children ", parent.children);
      childObj = parent.children.find(childId);
      if (childObj) {
        console.log("true");
        res.status(200).send(childObj.money);
      } else {
        console.log("this isnt a child of this parent");
        res.status(500).send("no authorization");
      }
    });
  }
});

export default router;
