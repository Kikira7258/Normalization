const express = require('express');
const conn = require('../lib/db');
const router = express.Router();


router.get('/students', (req, res, next) => {
    conn.query(
        'SELECT * FROM students', (err, data) => {
            if(err) return res.redirect('/login');

            res.render('students', {
                records: data,
            })
        }
    )
})

module.exports = router