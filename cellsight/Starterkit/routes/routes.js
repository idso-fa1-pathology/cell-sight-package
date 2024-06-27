const express = require('express');
const route = express.Router();

const AuthController = require("../controllers/AuthController")

module.exports = function (route) {

    route.use((req, res, next) => {
        var uemail = req.session.useremail;
        const allowUrls = ["/login", "/auth-validate", "/register", "/signup", "/forgotpassword", "/sendforgotpasswordlink", "/resetpassword", "/error", "/changepassword"];
        if (allowUrls.indexOf(req.path) !== -1) {
            if (uemail != null && uemail != undefined) {
                return res.redirect('/');
            }

        } else if (!uemail) {
            return res.redirect('/login');
        }
        next();
    })

    route.get('/', (req, res, next) => {
        res.render('index', { title: 'Hi, Welcome Back!' });
    })

    route.get('/index', (req, res, next) => {
        res.render('index', { title: 'Hi, Welcome Back!' });
    })
    route.get('/pages-maintenance', (req, res, next) => {
        res.render('pages-maintenance', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/pages-comingsoon', (req, res, next) => {
        res.render('pages-comingsoon', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/pages-500', (req, res, next) => {
        res.render('pages-500', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/pages-404', (req, res, next) => {
        res.render('pages-404', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-confirm-mail', (req, res, next) => {
        res.render('auth-confirm-mail', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-lock-screen', (req, res, next) => {
        res.render('auth-lock-screen', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-login', (req, res, next) => {
        res.render('auth-login', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-logout', (req, res, next) => {
        res.render('auth-logout', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-recoverpw', (req, res, next) => {
        res.render('auth-recoverpw', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-register', (req, res, next) => {
        res.render('auth-register', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-email-verification', (req, res, next) => {
        res.render('auth-email-verification', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/auth-two-step-verification', (req, res, next) => {
        res.render('auth-two-step-verification', { layout: 'layouts/layout-without-nav' });
    })
    route.get('/layouts-horizontal', (req, res, next) => {
        res.render('layouts-horizontal', { layout: 'layouts/layout-horizontal', title: 'Horizontal', page_title: 'Horizontal', folder: 'layouts' });
    })

    // Authentication
    route.get('/login', (req, res, next) => {
        res.render('auth/login', { title: 'Login', layout: 'layouts/layout-without-nav', 'message': req.flash('message'), error: req.flash('error') })
    })

    // validate login form
    route.post("/auth-validate", AuthController.validate)

    // logout
    route.get("/logout", AuthController.logout);

    route.get('/register', (req, res, next) => {
        res.render('auth/register', { title: 'Register', layout: 'layouts/layout-without-nav', message: req.flash('message'), error: req.flash('error') })
    })

    // validate register form
    route.post("/signup", AuthController.signup)

    route.get('/forgotpassword', (req, res, next) => {
        res.render('auth/forgotpassword', { title: 'Forgot password', layout: 'layouts/layout-without-nav', message: req.flash('message'), error: req.flash('error') })
    })

    // send forgot password link on user email
    route.post("/sendforgotpasswordlink", AuthController.forgotpassword)

    // reset password
    route.get("/resetpassword", AuthController.resetpswdview);
    // Change password
    route.post("/changepassword", AuthController.changepassword);

    //500
    route.get('/error', (req, res, next) => {
        res.render('auth/auth-404', { title: '404 Error', layout: 'layouts/layout-without-nav' });
    })
}