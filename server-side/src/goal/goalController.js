var mongoose = require("mongoose");
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var Goal = require("./goal")
var Child = require("../child/child")

// Get active goal

router.get("/", function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    var childId = mongoose.Types.ObjectId(jwt.decode(token)._id);
    Child.findById(childId, (err, child) => {
        if (err) {
            return res.status(500).send("Error getting child");
        } else {
            var unachievedGoals = child.goals.filter(goal => !goal.isAchieved);
            Goal.findById(unachievedGoals[0], (err, goal) => {
                if (err) {
                    res.status(500).send("Error getting goal");
                } else {
                    return res.status(200).send(goal);
                }
            });
        }
    });
  });

  // get by goal id

  router.get("/byChild", function (req, res) {
    var childId = req.query.childId;
    Child.findById(childId, (err, child) => {
        if (err || !child) {
            return res.status(500).send("Error getting child");
        } else {
            var unachievedGoals = child.goals.filter(goal => !goal.isAchieved);
            Goal.findById(unachievedGoals[0], (err, goal) => {
                if (err) {
                    res.status(500).send("Error getting goal");
                } else {
                    return res.status(200).send(goal);
                }
            });
        }
    });
  });

// Create a new goal.

router.post("/", (req, res) => {
    const goal = new Goal({
        description: req.body.description,
        amount: req.body.amount,
        isAchieved: req.body.isAchieved
    })

    const token = req.headers.authorization.split(" ")[1];
    var childId = mongoose.Types.ObjectId(jwt.decode(token)._id);

    // Create the new goal & Add it to the child's goals array.
    goal.save().then(goal => {
        Child.findByIdAndUpdate(childId,
            { $push: { goals: goal._id } },
            { new: true, useFindAndModify: false }, 
            (err, child) => {
                if (err) { res.send(err) }
                else { res.send(goal) }
            }
        );
    });
})

// Update existing goal by id.
router.put("/:id", (req, res) => {
    Goal.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
        // Check for erros
        if (err) { res.send(err) }
        else { res.send(result) }
    });
});

// Remove existing goal by id.
router.delete("/:id", (req, res) => {
    Goal.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) { res.send(err) }
        else { res.send(result) }
    })
})

export default router;
