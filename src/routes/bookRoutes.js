const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRouter');


function router(nav) {
    bookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const request = new sql.Request();
                const { recordset } = await request.query('select * from books');
                res.render('booksView', {
                        title: 'Books',
                        nav,
                        books: recordset,
                    } // instead of using sendFile we use render as we also use templating engine
                )
            })();
        });

    bookRouter.route('/:id')
        .all((req,res, next) => {
            const { id } = req.params;
            (async function query() {
                const request = new sql.Request();
                const { recordset } = await request.input('id', sql.Int, id).query('select * from books where id=@id');
                [ req.book ] = recordset;
                next();
            })();
        })
        .get((req, res) => {
            res.render('bookListView', {
                title: 'Book',
                nav,
                book: req.book,
            });
        });
    return bookRouter
}

module.exports = router;