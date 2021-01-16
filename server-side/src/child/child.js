var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ChildSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'Parent', required: true},
    money: {type: Number, default: 0},
    goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}],
    requests: [{type: Schema.Types.ObjectId, ref: 'Request'}],
    gameScore: [{type: Number, default: 0}]
});

module.exports = mongoose.model('Child', ChildSchema);
