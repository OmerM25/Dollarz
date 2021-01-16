var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var Goal = require("../goal/goal")
var Child = require("../child/child")

// Create a new goal.
router.post("/", (req, res) => {
    const goal = new Goal({
        description: req.body.description,
        amount: req.body.amount,
        isAchieved: req.body.isAchieved
    })

    // TODO: Check with Sapir if there's a way to get the childId using the login token?
    var childId = mongoose.Types.ObjectId(req.body.childId);

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
