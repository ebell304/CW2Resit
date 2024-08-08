const express = require('express');
const app = express();

require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
    extended: true
}))




const path = require('path');
const public = path.join(__dirname,'public');
// handles static paths to index.js
app.use(express.static(public));

const mustache = require('mustache-express');
// creates and sets mustache engine
app.engine('mustache', mustache());
app.set('view engine', 'mustache');




const router = require('./routes/charityRoutes.js');
// maps router to requests from application root
app.use('/', router);



const bodyParser = require('body-parser');
// adds middleware to parse incoming request bodies before handling
app.use(bodyParser.urlencoded({extended: true}));

// opens server on port 3000
app.listen(10000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})









