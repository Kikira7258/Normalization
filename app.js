// --------------------
// >> BASE VARIABLES <<
// --------------------
require('dotenv').config({path: './secrets.env'});
const express = require('express');
const conn = require('./lib/db');
const path = require('path');
// const router = express.Router();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express();

const loginAuth = require('./routes/login-auth')
const students = require('./routes/students')
const faculty = require('./routes/faculty')

const protect = require('./utils/protect')
// --------------------



// --------------------
// >> View engine and static files <<
// --------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')))
// --------------------


// --------------------
// >> CONFIG EXPRESS SERVER <<
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// --------------------


// --------------------
// >> MIDDLEWEAR <<
// --------------------
app.use(
    session({
        secret: 'theSecret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge:1000 * 60 * 2
        }
    })
)
// --------------------


// --------------------
// >> MIDDLEWEAR <<
// --------------------
app.use('/login', loginAuth)
app.use('/faculty', faculty)
app.use('/students', students)
// --------------------


// --------------------
// >> ROUTES SECTION | GET ROUTES <<
// --------------------
app.get('/', protect, (req, res) => {

    conn.query(
        'SELECT * FROM students', (err, rows) => {
            if(err) {
                console.log(err)
            };



            conn.query(
                'SELECT * FROM faculty', (err, data) => {
                    if(err) {
                        console.log(err)
                    }

                    res.render('homepage', {
                        records: data,
                        details:rows
                    })
                }
            )



        
        }
    ) 
})
// --------------------







// --------------------
// Port
// --------------------
const port = process.env.PORT || 3030
app.listen(port, () => console.log(`Listening on Port Port: ${3030}`))
// --------------------
