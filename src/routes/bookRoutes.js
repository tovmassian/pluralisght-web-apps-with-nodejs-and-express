const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    bookRouter.route('/')
        .get((req, res) => {
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
            })();
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useNewUrlParser: true });
                    debug('correctly connected to the server');

                    const db = client.db(dbName); // defining db in mongodb

                    const col = await db.collection('books');
                    const book = await col.findOne({_id: new ObjectId(id)});
                    res.render('bookListView', {
                        title: 'Book',
                        nav,
                        book: book,
                    }); // instead of using sendFile we use render as we also use templating engine
                } catch(err) {
                    debug(err.stack);
                }
                client.close();
            })();
        });
    return bookRouter
}

module.exports = router;