var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ParentSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    children: [{type: Schema.Types.ObjectId, ref: 'Child'}],
    chores: [{type: Schema.Types.ObjectId, ref: 'Chore'}]
});

module.exports = mongoose.model('Parent', ParentSchema);
