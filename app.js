const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const nav = [
    { link: '/books', title: 'Books' },
    { link: '/authors', title: 'Authors' },
];

app.use(morgan('combined')); // HTTP request logger middleware for node.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app); // executes passport

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));

const authRouter = require('./src/routes/authRoutes')(nav);
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')();

app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Library',
        nav,
    }); // instead of using sendFile we use render as we also use templating engine
});

app.listen(port, () => {
    debug(`Listening port at  ${chalk.green(port)}`);
});
