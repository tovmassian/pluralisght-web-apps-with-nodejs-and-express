const { MongoClient } = require('mongodb');
const { url, dbName } = require('../config/dbConfig');
const debug = require('debug')('app:adminController');

module.exports = function adminController() {
    const books = [
        { title: 'Little Prince', author: 'Antoine de Saint-Exupéry', bookId: '157993' },
        { title: 'Animal Farm', author: 'George Orwell', bookId: '7613' },
        { title: 'Lord of the Flies', author: 'William Golding', bookId: '7624' },
        { title: 'Nineteen Eighty-Four', author: 'George Orwell', bookId: '5471' },
        { title: 'Harry Potter and the Half-Blood Prince', author: 'J. K. Rowling', bookId: '1' }
    ];

    function setBookData(req, res) {
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
    }

    return {
        setBookData,
    }
};