const express = require('express');
const conn = require('../lib/db');
const router = express.Router();


// --------------------
// ADD ROUTE
// --------------------

router.get('/', (req, res, next) => {
    conn.query(
        'SELECT * FROM students', (err, data) => {
            if(err) return res.redirect('/login');


            conn.query(
                'SELECT COUNT(id) AS numofstudents FROM students', (err, results) => {
                    if(err) {
                        console.log(err),
                        res.redirect('/login');  
                    } else {
                        console.log(results);
                        res.render('students', {
                            details: data,
                            count: results[0].numofstudents || 'N/A'
                        })
                    }      
                }
            )

        }
    )
})
// --------------------




// --------------------
// EDIT ROUTE
// --------------------
router.get('/edit/:id', (req, res) => {
    conn.query('SELECT * FROM students WHERE id = ' + req.params.id, (err, rows) => {
        if(err){
            console.log(err)
        } else {
            console.log(rows[0])

            res.render('student_edit', {
                id: rows[0].id,
                first_nm: rows[0].first_nm,
                last_nm: rows[0].last_nm,
                student_id: rows[0].student_id,
                teacher: rows[0].teacher
            })
        }
    })
})
// --------------------



// --------------------
// UPDATE ROUTE
// --------------------
router.post('/update', (req, res) => {
    conn.query(`UPDATE students SET first_nm = '${req.body.first_nm}', last_nm = '${req.body.last_nm}', teacher = '${req.body.teacher}', student_id = ${req.body.student_id} WHERE id = ${req.body.id}`, (err,results) => {
        if (err) console.log(err)

        res.redirect('/students');
    })
})
// --------------------







module.exports = router