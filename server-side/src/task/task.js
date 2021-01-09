var Schema = mongoose.Schema;
var TaskSchema = new Schema({
    id: {type: Schema.Types.ObjectId, required: true},
    description: {type: String, required: true},
    amount: {type: Number, min: 0, required: true},
    isFinished: {type: Boolean, required: true}
});

module.exports = mongoose.model('Task', TaskSchema);
