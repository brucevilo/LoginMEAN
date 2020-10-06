var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next();
        user.password = hash;
        next();
    });

});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); 
};

module.exports = mongoose.model('User', userSchema);    