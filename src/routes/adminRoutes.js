const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');

function router() {
    const { setBookData } = adminController();

    adminRouter.route('/')
        .get(setBookData);

    return adminRouter
}

module.exports = router;