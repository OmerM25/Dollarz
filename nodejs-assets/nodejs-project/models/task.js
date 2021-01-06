class Task {
    constructor(id, description, amount, isFinished) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.isFinished = isFinished;
    }
}
module.exports.Task = Task;