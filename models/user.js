var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
    refreshTokens: [String],
    local: {
        email: String,
        password: String        
    },
    facebook:{
        id:String,
        token:String,
        email:String,
        name:String
    }
});

userSchema.methods.generateHash = function (password, callback) {
    bcrypt.genSalt(8, function (err, salt) {
        bcrypt.hash(password, salt, null, function (err, hash) {
            callback(err, hash);
        });
    });
};

userSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.local.password, function (err, result) {
        callback(err, result);
    });
};

module.exports = mongoose.model('User', userSchema);