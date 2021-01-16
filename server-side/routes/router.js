const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

// Authenticate using jwt using middleware
router.use((req, res, next) => {
  // Exclude login and registration page
  if (req.originalUrl.toString() !== "/login" && req.originalUrl.toString() !== "/register") {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      // Get the user token
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;

      jwt.verify(req.token, "dollarzJwt", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        }
      });
    } else {
      res.sendStatus(403);
    }
  }

  // Continue to next middleware
  next();
});

// module.exports = router;
export default router;
