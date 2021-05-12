var express = require("express");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var async = require("async");

var router = express.Router();
var Child = require("../child/child");
var Parent = require("../parent/parent");
var MoneyHistory = require("../moneyHistory/moneyHistory");
const User = require("../user/user");

router.get("/monthly", async function (req, res) {
    var childId = mongoose.Types.ObjectId(req.query.childId);
    try {
        var history = await func(childId);
        return res.status(200).send(history);
    } catch (err) {
        return res.status(500).send(err);
    }
});

const getLastHistory = async (childId, startDate, endDate) => {
    const history = await MoneyHistory.findOne({ 'child': { $eq: childId }, 'date': { $gte: startDate, $lt: endDate } }, {}, { sort: { 'date': -1 } });
    
    return history ? history.amount : history;
}

const func = async (childId) => {
    var historyByMonth = [];
    var currMonth = new Date().getMonth();
    var year = new Date().getFullYear();
    for (var i = 0; i < 12; i++) {
        year = new Date().getFullYear();
        if (i > currMonth) {
            year--;
        }
        var startDate = new Date(year, i, 1, 0, 0, 0, 0);
        var endDate = new Date(year, i + 1, 1, 0, 0, 0, 0);
        var amount = await getLastHistory(childId, startDate, endDate);
        historyByMonth.push({ date: new Date(year, i, 2), amount: amount });
    }

    return historyByMonth;
}

export default router;
