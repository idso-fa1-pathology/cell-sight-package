const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email")

const login = (req, res) => {
    console.log(res.locals.userLogin);
    if (res.locals.userLogin) {
        return res.redirect('dashboard');
    }
    return res.render('login');
}

// check login credential
const validate = async (req, res) => {

    var userEmail = req.body.email;
    var userPassword = req.body.password;

    const user = User.findOne({ email: userEmail }, async function (err, currentUser) {
        if (err) {
            console.log("errors", err);
            return res.redirect('/login');
        }

        if (!currentUser || ! await bcrypt.compare(userPassword, currentUser.password)) {
            console.log("user not found");
            req.flash("error", "Invalid Email or Password.");
            return res.redirect('/login');
        }

        // Set current user data in session 
        const usersession = req.session;
        usersession.userid = currentUser._id;
        usersession.username = currentUser.name;
        usersession.useremail = currentUser.email;
        return res.redirect('/');
    });

}

// registration
const signup = async (req, res) => {
    var username = req.body.username;
    var userEmail = req.body.email;
    var userpassword = req.body.password;

    // check user exists or not
    const existsUser = await User.findOne({ email: userEmail });

    if (existsUser) {
        req.flash("error", "Account already register.");
        return res.redirect('/register');
    }

    var formdata = {
        name: username,
        email: userEmail,
        password: userpassword
    };

    User.create(formdata, function (err, res) {
        console.log(err, res);
    });
    req.flash("message", "Registration successfull.");
    return res.redirect("/register");
}

const logout = (req, res) => {

    req.session.destroy();
    res.redirect('/login')
}

// forgot password send link
const forgotpassword = async (req, res) => {

    const userEmail = req.body.email;
    // console.log(userEmail);

    const user = await User.findOne({ email: userEmail });

    if (!user) {
        console.log("user not exists");
        req.flash("error", "Please provide valid email id.")
        return res.redirect('/forgotpassword')
    }

    console.log("email user", user.email);
    // Generate the random token
    var resetToken = user.createPasswordResetToken();
    // console.log("token", resetToken);

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/resetpassword?token=${resetToken}`;
    console.log("resetPasswordUrl", resetPasswordUrl)

    const message = 'Reset your password with given link: <a href="' + resetPasswordUrl + '">' + resetPasswordUrl + "</a>";
    try {
        var subject = process.env.EMAIL_FORGET_PSWD_SUBJECT
        await sendEmail({
            email: user.email,
            subject: subject,
            message
        });
        req.flash("message", "Password reset link send on email id.")
    } catch (err) {
        console.log(err);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        req.flash("error", err.message)
    }

    return res.redirect('/forgotpassword')
}

// check token is valid or not
const resetpswdview = async (req, res) => {
    var token = req.query.token;

    // decode string
    let bufferObj = Buffer.from(token, "base64");
    token = bufferObj.toString("utf8");
    console.log("base64 decode string", token);
    let decodeStr = token.split("|");
    // console.log("After split", decodeStr[0], decodeStr[1]);

    const user = await User.findOne({ _id: decodeStr[1], passwordResetToken: decodeStr[0], passwordResetExpires: { $gt: Date.now() } });

    if (!user) {
        return res.redirect("/error");
    }
    return res.render("auth/resetpassword", { token: user._id, title: 'Change Password', layout: 'layouts/layout-without-nav' });
}

// Change password
const changepassword = async (req, res) => {

    const userId = req.body.token;
    const password = req.body.password;
    // console.log(userId, password);

    const user = await User.findOne({ _id: userId });
    if (!user) {
        return res.redirect("/error");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    req.flash("message", "Password reset successfully.");
    return res.redirect("/login");

}
module.exports = { login, validate, logout, signup, forgotpassword, resetpswdview, changepassword }