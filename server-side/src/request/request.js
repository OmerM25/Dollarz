var Schema = mongoose.Schema;
var RequestSchema = new Schema({
    senderId: {type: Number, required: true},
    receiverId: {type: Number, required: true},
    isApproved: {type: Number, required: true},
    amount: {type: Number, required: true}
});

module.exports = mongoose.model('Request', RequestSchema);
