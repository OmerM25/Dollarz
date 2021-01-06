const { User } = require("./user");

class Parent extends User {
    constructor(id, name, password, children, tasks) {
        super(id, name, password);
        this.children = children;
        this.tasks = tasks;
    }
}
module.exports.Parent = Parent;