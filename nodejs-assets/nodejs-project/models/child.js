const { User } = require("./user");

class Child extends User {
    constructor(id, name, password, parent, money, goals, requests, gameScore) {
        super(id, name, password);
        this.parent = parent;
        this.money = money;
        this.goals = goals;
        this.requests = requests;
        this.gameScore = gameScore;
    }
}
module.exports.Child = Child;