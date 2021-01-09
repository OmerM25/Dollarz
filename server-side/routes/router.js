const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

import { NextFunction, Request, Response } from "express";

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

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.render("index", { title: "Express" });
  res.json({ msg: "homepage" });
});

router.post("/login", function (req, res, next) {
  const user = {
    name: "sapir",
    email: "12@gmail.com",
  };

  // ---ADD HERE CHECK WHETHER THE USER EXIST IN THE DB---

  // Register only existing users
  jwt.sign({ user }, "dollarzJwt", (err, token) => {
    res.json({
      token,
    });
  });
});

//module.exports = router;
export default router;
