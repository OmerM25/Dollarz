var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ParentSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    children: [{type: Schema.Types.ObjectId, ref: 'Child'}],
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

module.exports = mongoose.model('Parent', ParentSchema);
