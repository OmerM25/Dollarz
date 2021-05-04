var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var async = require("async");

var router = express.Router();
var Child = require("./child");
var Parent = require("../parent/parent");
const User = require("../user/user");

// Get basic info on a child - name and money
router.post("/", function (req, res) {
  // Get sender token
  const token = req.headers.authorization.split(" ")[1];

  // Get sender _id
  const sender = jwt.decode(token)._id;

  // If the child is the sender of the request
  if (req.body.childId === sender) {
    Child.findById(sender, (err, child) => {
      if (err || !child) {
        res.status(500).send("child doesnt exist");
      } else {
        User.findById(child.userDetails, "name", (err, user) => {
          if (err || !user) {
            res.status(500).send("user doesnt exist");
          } else {
            res.status(200).send({ child, user });
          }
        });
      }
    });
  } else {
    // Check that the sender has authorization (give auth to his parent only)
    Parent.findById(sender, (err, parent) => {
      if (err || !parent) {
        res.status(500).send("no authorization");
      }

      // Check if the parent asks info for his own child
      if (parent.children.find((child) => child.toString() === req.body.childId)) {
        Child.findById(req.body.childId, (err, child) => {
          if (!child || err) {
            res.status(500).send("no authorization");
          } else {
            User.findById(child.userDetails, "name", (err, user) => {
              if (err || !user) {
                res.status(500).send("user doesnt exist");
              } else {
                res.status(200).send({ child, user });
              }
            });
          }
        });
      } else {
        res.status(500).send("no authorization");
      }
    });
  }
});

router.get("/", function (req, res) {
  // Get sender token
  const token = req.headers.authorization.split(" ")[1];

  // Get sender _id
  const sender = jwt.decode(token)._id;

  let ids = req.query.children.map(child => new mongoose.Types.ObjectId(child));
  let children = [];

  async.each(ids, function(currChildId, callback) {
    Parent.findById(sender, (err, parent) => {
      if (err || !parent) {
        return res.status(500).send("no authorization");
      }

      // Check if the parent asks info for his own child
      if (parent.children.find((child) => child.equals(currChildId))) {
        Child.findById(currChildId.toString(), (err, child) => {
          if (!child || err) {
            res.status(500).send("no authorization");
          } else {
            User.findById(child.userDetails, (err, user) => {
              if (err || !user) {
                res.status(500).send("user doesnt exist");
              } else {
                children.push({child, user});
                callback();
              }
            });
          }
        });
      } else {
        res.status(500).send("no authorization");
      }
    });
  }, function (err) {
    if (err) {
      res.status(500).send("There was an error getting the children");
    } else {
      res.status(200).send(children);
    }
  });
});

// Add/sub money for a specific child
router.put("/updatemoney/:id", (req, res) => {
  User.findOne({ idNumber: req.params.id }, (err, user) => {
    if (err || !user) {
      res.status(500).send("error");
    }
    Child.findOneAndUpdate({ userDetails: user._id }, { $inc: req.body },
      { new: true, useFindAndModify: false }, function (err, result) {
      // Check for erros
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
});

router.put("/addAllowance/:id", (req, res) => {
  console.log(req);
});

export default router;
