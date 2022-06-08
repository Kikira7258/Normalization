// --------------------
// base variables
// --------------------
const express = require('express');
const router = express.Router();
const conn = require('../lib/db');
// --------------------



// --------------------
// GET ROUTE
// --------------------
router.get('/', (req, res) => {
    res.render('login', {
        message: {
            error: "",
            seccess: ""
        }
    })
})
// --------------------



// --------------------
// POST ROUTE
// --------------------
router.post('/', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;


    conn.query('SELECT id, email, password FROM login_auth WHERE email = ? AND BINARY password = ?', [email, password], (err, rows, fields) => {
        console.log(rows.length);

        if(err || rows.length <= 0) {
            console.log(err);
            res.redirect('/login')
        } else {
            // req.session.login_auth = rows[0].id;
            req.session.isLoggedIn = true;
            res.redirect('/students')
        }
    })
})



// Logout
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
});
// --------------------



module.exports = router