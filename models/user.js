var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, sparse: true },
  password: { type: String, required: true }
});

// restricts the information received in a user request to exclude the password
UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name
        };
        return returnJson;
    }
});

UserSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res ? this : false);
      }
  });
}

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);