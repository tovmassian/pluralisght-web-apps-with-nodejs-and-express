const { MongoClient, ObjectId } = require('mongodb');
const { url, dbName } = require('../config/dbConfig');
const debug = require('debug')('app:bookController');

module.exports = function bookController(bookService, nav) {
    function getIndex(req, res) {
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                debug('correctly connected to the server');

                const db = client.db(dbName); // defining db in mongodb

                const col = await db.collection('books');
                const books = await col.find().toArray();
                res.render('booksView', {
                    title: 'Books',
                    nav,
                    books,
                }); // instead of using sendFile we use render as we also use templating engine
            } catch(err) {
                debug(err.stack);
            }
            client.close();
        }());
    }
    function getByIndex(req, res) {
        const { id } = req.params;

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url, { useNewUrlParser: true });
                debug('correctly connected to the server');

                const db = client.db(dbName); // defining db in mongodb

                const col = await db.collection('books');
                const book = await col.findOne({_id: new ObjectId(id)});
                book.details = await bookService.getBookById(book.bookId);
                res.render('bookListView', {
                    title: 'Book',
                    nav,
                    book: book,
                }); // instead of using sendFile we use render as we also use templating engine
            } catch(err) {
                debug(err.stack);
            }
            client.close();
        }());
    }
    function middleware(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }

    return {
        getIndex,
        getByIndex,
        middleware,
    }
};