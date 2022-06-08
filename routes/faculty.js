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







// --------------------
// EDIT ROUTE
// --------------------
router.get('/edit/:id', (req, res) => {
    conn.query('SELECT * FROM faculty WHERE id = ' + req.params.id, (err, rows) => {
        if(err){
            console.log(err)
        } else {
            console.log(rows[0])

            res.render('faculty_edit', {
                id: rows[0].id,
                first_nm: rows[0].first_nm,
                last_nm: rows[0].last_nm,
                room: rows[0].room,
                dept: rows[0].dept
            })
        }
    })
})
// --------------------



// --------------------
// UPDATE ROUTE
// --------------------
router.post('/update', (req, res) => {
    conn.query(`UPDATE faculty SET first_nm = '${req.body.first_nm}', last_nm = '${req.body.last_nm}', room = '${req.body.room}', dept = ${req.body.dept} WHERE id = ${req.body.id}`, (err,results) => {
        if (err) console.log(err)

        res.redirect('/faculty');
    })
})
// --------------------









module.exports = router