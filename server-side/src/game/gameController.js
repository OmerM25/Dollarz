import { nextTick } from "process";

var mongoose = require("mongoose");
var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
const fs = require('fs');

// Get american questions game
router.get("/americanquestions", function (req, res) {
    try {
        let rawQuestions = fs.readFileSync('american_questions_game.json', 'utf-8');
        let questions = JSON.parse(rawQuestions)
        questions = shuffleArray(questions)
        res.status(200).send(questions)
    } catch (ex) {
        res.status(500).send(ex)
    }
});

function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export default router;