const express = require('express');
const { MongoClient } = require('mongodb');
const { url, dbName } = require('../config/dbConfig');
const debug = require('debug')('app:authRouter');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signup')
         .post((req, res) => {
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
        });
    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                title: 'Sign In',
                nav,
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    authRouter.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });
    return authRouter;
}

module.exports = router;