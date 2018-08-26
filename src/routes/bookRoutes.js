const express = require('express');
const bookRouter = express.Router();



function router(nav) {
    const books = [
        {
            "id" : "1",
            "cat" : ["book","hardcover"],
            "name" : "The Lightning Thief",
            "author" : "Rick Riordan",
            "series_t" : "Percy Jackson and the Olympians",
            "sequence_i" : 1,
            "genre_s" : "fantasy",
            "inStock" : true,
            "price" : 12.50,
            "pages_i" : 384
        },
        {
            "id" : "2",
            "cat" : ["book","paperback"],
            "name" : "The Sea of Monsters",
            "author" : "Rick Riordan",
            "series_t" : "Percy Jackson and the Olympians",
            "sequence_i" : 2,
            "genre_s" : "fantasy",
            "inStock" : true,
            "price" : 6.49,
            "pages_i" : 304,
        },
        {
            "id" : "3",
            "cat" : ["book","paperback"],
            "name" : "Sophie's World : The Greek Philosophers",
            "author" : "Jostein Gaarder",
            "sequence_i" : 1,
            "genre_s" : "fantasy",
            "inStock" : true,
            "price" : 3.07,
            "pages_i" : 64,
        },
        {
            "id" : "4",
            "cat" : ["book","paperback"],
            "name" : "Lucene in Action, Second Edition",
            "author" : "Michael McCandless",
            "sequence_i" : 1,
            "genre_s" : "IT",
            "inStock" : true,
            "price" : 30.50,
            "pages_i" : 475,
        },
    ];
    bookRouter.route('/')
        .get((req, res) => {
            res.render('booksView', {
                title: 'Books',
                nav,
                books,
            }); // instead of using sendFile we use render as we also use templating engine
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            // res.send(req.params.id);
            res.render('bookListView', {
                title: 'Book',
                nav,
                book: books[id],
            }); // instead of using sendFile we use render as we also use templating engine
        });
    return bookRouter
}

module.exports = router;