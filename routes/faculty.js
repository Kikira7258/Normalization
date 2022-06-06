const express = require('express');
const conn = require('../lib/db');
const router = express.Router();


router.get('/', (req, res, next) => {
    conn.query(
        'SELECT * FROM faculty', (err, data) => {
            if(err) return res.redirect('/login');

            res.render('faculty', {
                records: data,
            })
        }
    )
})



module.exports = router