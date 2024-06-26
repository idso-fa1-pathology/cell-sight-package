const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    created_at: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    this.created_at = Date.now()
    next();
});

/**
 * Reset Password
 */
UserSchema.methods.createPasswordResetToken = function () {
    let resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = resetToken;
    resetToken = resetToken + "|" + this._id;
    this.created_at = Date.now()
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    let bufferObj = Buffer.from(resetToken, "utf8");
    resetToken = bufferObj.toString("base64");
    return resetToken;
}

const user = mongoose.model('users', UserSchema);
module.exports = user;
