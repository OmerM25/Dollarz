var express = require("express");
const Chore = require("../chore/chore");
var router = express.Router();
var Parent = require("../parent/parent")
var mongoose = require("mongoose");

// Create
router.post('/', function (req, res) {
    const chore = new Chore({
        description: req.body.description,
        amount: req.body.amount,
        isFinished: false
    });
    
    var parentId = mongoose.Types.ObjectId(req.body.parentId);

    chore.save().then((err, chore) => {
        if (err) { res.send(err) }
        else {
            Parent.findByIdAndUpdate(parentId,
                { $push: { chores: chore._id } },
                { new: true, useFindAndModify: false },
                (err, parent) => {
                    if (err) { res.send(err) }
                    else { res.send(chore) }
                }
            );
        }
    });
});

// Update
router.put("/:id", (req, res) => {
    Chore.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
        if (err) { res.send(err) }
        else { res.send(result) }
    });
});

// Delete
router.delete("/:id", (req, res) => {
    Chore.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) { res.send(err) }
        else { res.send(result) }
    });
});

export default router;