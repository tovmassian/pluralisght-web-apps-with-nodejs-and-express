const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const { url, dbName } = require('../dbConfig');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy (
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useNewUrlParser: true });
                    debug('correctly connected to the server');
                    const db = client.db(dbName); // defining db in mongodb

                    const col = db.collection('users'); // defining users collection from db
                    const user = await col.findOne({ username }); // getting user with username
                    if ( user && user.password === password) {
                        done(null, user); // successRedirect
                    } else {
                        done(null, false); // failureRedirect
                    }
                } catch(err) {
                    debug(err.stack);
                }
                client.close();
            }());
        }));
};