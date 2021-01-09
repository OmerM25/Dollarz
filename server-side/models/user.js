var Schema = mongoose.Schema;
var UserSchema = new Schema({
    id: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
