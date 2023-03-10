const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "no puede estar en blanco."], match: [/^[a-zA-Z0-9]+$/, 'es inválido.'], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "no puede estar en blanco."], match: [/\S+@\S+\.\S+/, 'es inválido.'], index: true },
    level: { type: String, lowercase: true, required: true },
    hash: String,
    salt: String
}, { timestamps: true });

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        level: this.level,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.secret);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        level: this.level,
        token: this.generateJWT()
    };
};

module.exports = mongoose.model('User', UserSchema);