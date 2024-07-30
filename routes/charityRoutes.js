// importing the Express module to access express.Router class
const express = require('express');
const router = express.Router(); 

// importing controller
const controller = require('../controllers/charityControllers.js');


//           REQUEST HANDLERS           //

// request handler for application root
router.get("/", controller.landing_page);

// request handler for items page
router.get('/items', controller.item_list);

// request handler for add item page
router.get('/items/add', controller.add_item);

// request handler for about page
router.get('/about', controller.about);

// request handler to get entries by specific user
router.get('/entriesByUser', controller.get_entries_by_user);




// functionality for 404 errors (page not found)
router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('Error 404: Page not found.');
})

// functionality for 500 errors (internal server error)
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Error 500: Internal server error.');
})


// exporting router code to make it accessible to index.js
module.exports = router;