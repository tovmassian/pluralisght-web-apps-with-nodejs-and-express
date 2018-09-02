const express = require('express');
const adminRouter = express.Router();
const { MongoClient } = require('mongodb');
const { url, dbName } = require('../config/dbConfig');
const debug = require('debug')('app:adminRoutes');
const books = [
    { title: 'Little Prince', author: 'Antoine de Saint-Exupéry' },
    { ititle: 'Animal Farm', author: 'George Orwell'},
    { title: 'Lord of the Flies', author: 'William Golding'},
    { title: 'Nineteen Eighty-Four', author: 'George Orwell'},
    { title: 'Harry Potter and the Half-Blood Prince', author: 'J. K. Rowling'}
];

function router() {
    adminRouter.route('/')
        .get((req, res) => {
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useNewUrlParser: true });
                    debug('correctly connected to the server');

                    const db = client.db(dbName); // defining db in mongodb

                    const response = await db.collection('books').insertMany(books); // inserting data to mongodb
                    res.json(response);
                } catch(err) {
                    debug(err.stack);
                }
                client.close();
            }());
        });

    return adminRouter
}

module.exports = router;