var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var router = express.Router();
var Child = require("../child/child");
const Request = require("./request");

// Create
router.post('/', function (req, res) {

  const token = req.headers.authorization.split(" ")[1];
  //var childId = mongoose.Types.ObjectId(jwt.decode(token).user._id);
  // there are no childrens yet- so im just cheking
  var childId= '123';
  let childobj = Child.findById(childId);
  //let parentId= childobj.parent;
  let parentId= '1212';

    const request = new Request({
        childId: childId,
        parentId: parentId,
        status: '0',
        dateRequested: Date.now(),
        amount: req.body.amount,
        reason: req.body.reason
    });

    request.save().then((err, chore) => {
        if (err) { res.send(err) }
        else {
            res.status(200).send("request created successfully");
        }
    });
});

// get the latest request
router.get('/', function (req, res) {

  // Get sender token
  //const token = req.headers.authorization.split(" ")[1];
 // var userId = mongoose.Types.ObjectId(jwt.decode(token).user._id);

Request.findOne({ parentId: '1212', status: '0'}, (err, request) => {
    if (err ) {
      res.status(500).send("no requests");
    } else {
      console.log("request is- ", request);
      res.status(200).send(request);
    }
  });

  });

  router.put("/approve/:id", (req, res) => {
    Request.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
        // Check for erros
        if (err) { res.send(err) }
        else { res.send(result) }
    });
});

router.put("/reject/:id", (req, res) => {
    Request.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
        // Check for erros
        if (err) { res.send(err) }
        else { res.send(result) }
    });
});

export default router;