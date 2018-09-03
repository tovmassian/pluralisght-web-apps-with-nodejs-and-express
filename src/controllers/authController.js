const { MongoClient } = require('mongodb');
const { url, dbName } = require('../config/dbConfig');
const debug = require('debug')('app:authController');

module.exports = function authController(nav) {
    function register(req, res) {
        const { username, password } = req.body;
        (async function addUser(){
            let client;
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                debug('correctly connected to the server');
                const db = client.db(dbName); // defining db in mongodb

                const user = { username, password }; // building user object
                const col = db.collection('users'); // defining users collection
                const result = await col.insertOne(user); // inserting one data into users collection
                req.login(result.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            } catch(err) {
                debug(err.stack);
            }
            client.close();
        }());
    }
    function renderLoginPage(req, res) {
        res.render('signin', {
            title: 'Sign In',
            nav,
        });
    }

    function renderLogoutPage(req, res) {
        req.logout();
        res.redirect('/');
    }

    function middleware(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }

    function getProfilePage(req, res) {
        res.json(req.user);
    }

    return {
        register,
        renderLoginPage,
        renderLogoutPage,
        middleware,
        getProfilePage,
    }
};