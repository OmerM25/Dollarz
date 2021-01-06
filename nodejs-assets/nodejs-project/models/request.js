class Request {
    constructor(id, senderId, receiverId, isApproved, amount) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.isApproved = isApproved;
        this.amount = amount;
    }
}
module.exports.Request = Request;