const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

function router(nav) {
    const {
        register,
        renderLoginPage,
        renderLogoutPage,
        middleware,
        getProfilePage
    } = authController(nav);

    authRouter.route('/signup')
         .post(register);
    authRouter.route('/signin')
        .get(renderLoginPage)
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    authRouter.route('/logout')
        .get(renderLogoutPage);
    authRouter.route('/profile')
        .all(middleware)
        .get(getProfilePage);

    return authRouter;
}

module.exports = router;