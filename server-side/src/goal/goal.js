var Schema = mongoose.Schema;
var GoalSchema = new Schema({
    id: {type: Schema.Types.ObjectId, required: true},
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    isAchieved: {type: Boolean, required: true}
});

module.exports = mongoose.model('Goal', GoalSchema);
