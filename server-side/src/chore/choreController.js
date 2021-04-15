var express = require("express");
const Chore = require("./chore");
var router = express.Router();
var Parent = require("../parent/parent")
var mongoose = require("mongoose");

// Get chore

router.get("/", function (req, res) {
    let ids = req.query.chores.map(chore => new mongoose.Types.ObjectId(chore));
    Chore.find({'_id': { $in: ids}}, (err, chores) => {
        if (err) {
            return res.status(500).send("Error getting chores");
        } else {
            return res.status(200).send(chores);
        }
    });
  });

// Create
router.post('/', function (req, res) {
    const chore = new Chore({
        description: req.body.description,
        amount: req.body.amount,
        isFinished: false
    });

    var parentId = mongoose.Types.ObjectId(req.body.parentId);
    console.log(req.body);

    chore.save().then(chore => {
        Parent.findByIdAndUpdate(parentId,
            { $push: { chores: chore._id } },
            { new: true, useFindAndModify: false },
            (err, parent) => {
                if (err) { res.send(err) }
                else { res.send(chore) }
            }
        );
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