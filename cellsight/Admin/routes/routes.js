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
    route.get('/apps-blog-detail', (req, res, next) => {
        res.render('apps-blog-detail', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-blog-grid', (req, res, next) => {
        res.render('apps-blog-grid', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-blog-list', (req, res, next) => {
        res.render('apps-blog-list', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-calendar', (req, res, next) => {
        res.render('apps-calendar', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-chat', (req, res, next) => {
        res.render('apps-chat', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-contacts-grid', (req, res, next) => {
        res.render('apps-contacts-grid', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-contacts-list', (req, res, next) => {
        res.render('apps-contacts-list', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-contacts-profile', (req, res, next) => {
        res.render('apps-contacts-profile', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-email-inbox', (req, res, next) => {
        res.render('apps-email-inbox', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-email-read', (req, res, next) => {
        res.render('apps-email-read', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-invoices-detail', (req, res, next) => {
        res.render('apps-invoices-detail', { title: 'Hi, Welcome Back!' });
    })
    route.get('/apps-invoices-list', (req, res, next) => {
        res.render('apps-invoices-list', { title: 'Hi, Welcome Back!' });
    })
    route.get('/charts-apex', (req, res, next) => {
        res.render('charts-apex', { title: 'Hi, Welcome Back!' });
    })
    route.get('/charts-chartjs', (req, res, next) => {
        res.render('charts-chartjs', { title: 'Hi, Welcome Back!' });
    })
    route.get('/charts-echart', (req, res, next) => {
        res.render('charts-echart', { title: 'Hi, Welcome Back!' });
    })
    route.get('/charts-knob', (req, res, next) => {
        res.render('charts-knob', { title: 'Hi, Welcome Back!' });
    })
    route.get('/charts-sparkline', (req, res, next) => {
        res.render('charts-sparkline', { title: 'Hi, Welcome Back!' });
    })
    route.get('/extended-lightbox', (req, res, next) => {
        res.render('extended-lightbox', { title: 'Hi, Welcome Back!' });
    })
    route.get('/extended-notifications', (req, res, next) => {
        res.render('extended-notifications', { title: 'Hi, Welcome Back!' });
    })
    route.get('/extended-rangeslider', (req, res, next) => {
        res.render('extended-rangeslider', { title: 'Hi, Welcome Back!' });
    })
    route.get('/extended-rating', (req, res, next) => {
        res.render('extended-rating', { title: 'Hi, Welcome Back!' });
    })
    route.get('/extended-session-timeout', (req, res, next) => {
        res.render('extended-session-timeout', { title: 'Hi, Welcome Back!' });
    })
    route.get('/extended-sweet-alert', (req, res, next) => {
        res.render('extended-sweet-alert', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-advanced', (req, res, next) => {
        res.render('form-advanced', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-editors', (req, res, next) => {
        res.render('form-editors', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-elements', (req, res, next) => {
        res.render('form-elements', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-mask', (req, res, next) => {
        res.render('form-mask', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-uploads', (req, res, next) => {
        res.render('form-uploads', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-validation', (req, res, next) => {
        res.render('form-validation', { title: 'Hi, Welcome Back!' });
    })
    route.get('/form-wizard', (req, res, next) => {
        res.render('form-wizard', { title: 'Hi, Welcome Back!' });
    })
    route.get('/icons-boxicons', (req, res, next) => {
        res.render('icons-boxicons', { title: 'Hi, Welcome Back!' });
    })
    route.get('/icons-dripicons', (req, res, next) => {
        res.render('icons-dripicons', { title: 'Hi, Welcome Back!' });
    })
    route.get('/icons-fontawesome', (req, res, next) => {
        res.render('icons-fontawesome', { title: 'Hi, Welcome Back!' });
    })
    route.get('/icons-materialdesign', (req, res, next) => {
        res.render('icons-materialdesign', { title: 'Hi, Welcome Back!' });
    })
    route.get('/maps-google', (req, res, next) => {
        res.render('maps-google', { title: 'Hi, Welcome Back!' });
    })
    route.get('/maps-leaflet', (req, res, next) => {
        res.render('maps-leaflet', { title: 'Hi, Welcome Back!' });
    })
    route.get('/maps-vector', (req, res, next) => {
        res.render('maps-vector', { title: 'Hi, Welcome Back!' });
    })
    route.get('/pages-faqs', (req, res, next) => {
        res.render('pages-faqs', { title: 'Hi, Welcome Back!' });
    })
    route.get('/pages-pricing', (req, res, next) => {
        res.render('pages-pricing', { title: 'Hi, Welcome Back!' });
    })
    route.get('/pages-starter', (req, res, next) => {
        res.render('pages-starter', { title: 'Hi, Welcome Back!' });
    })
    route.get('/pages-timeline', (req, res, next) => {
        res.render('pages-timeline', { title: 'Hi, Welcome Back!' });
    })
    route.get('/tables-basic', (req, res, next) => {
        res.render('tables-basic', { title: 'Hi, Welcome Back!' });
    })
    route.get('/tables-datatable', (req, res, next) => {
        res.render('tables-datatable', { title: 'Hi, Welcome Back!' });
    })
    route.get('/tables-editable', (req, res, next) => {
        res.render('tables-editable', { title: 'Hi, Welcome Back!' });
    })
    route.get('/tables-responsive', (req, res, next) => {
        res.render('tables-responsive', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-alerts', (req, res, next) => {
        res.render('ui-alerts', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-buttons', (req, res, next) => {
        res.render('ui-buttons', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-cards', (req, res, next) => {
        res.render('ui-cards', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-carousel', (req, res, next) => {
        res.render('ui-carousel', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-colors', (req, res, next) => {
        res.render('ui-colors', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-dropdowns', (req, res, next) => {
        res.render('ui-dropdowns', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-general', (req, res, next) => {
        res.render('ui-general', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-grid', (req, res, next) => {
        res.render('ui-grid', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-images', (req, res, next) => {
        res.render('ui-images', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-modals', (req, res, next) => {
        res.render('ui-modals', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-offcanvas', (req, res, next) => {
        res.render('ui-offcanvas', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-placeholders', (req, res, next) => {
        res.render('ui-placeholders', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-progressbars', (req, res, next) => {
        res.render('ui-progressbars', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-tabs-accordions', (req, res, next) => {
        res.render('ui-tabs-accordions', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-toasts', (req, res, next) => {
        res.render('ui-toasts', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-typography', (req, res, next) => {
        res.render('ui-typography', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-utilities', (req, res, next) => {
        res.render('ui-utilities', { title: 'Hi, Welcome Back!' });
    })
    route.get('/ui-video', (req, res, next) => {
        res.render('ui-video', { title: 'Hi, Welcome Back!' });
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