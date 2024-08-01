const express = require('express');
const app = express();
const router = require('./routes/charityRoutes.js');
const path = require('path');
const public = path.join(__dirname,'public');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');

// adds middleware to parse incoming request bodies before handling
app.use(bodyParser.urlencoded({extended: false}));

// maps router to requests from application root
app.use('/', router);

// handles static paths to index.js
app.use(express.static(public));



// opens server on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})

// creates and sets mustache engine
app.engine('mustache', mustache());
app.set('view engine', 'mustache');


