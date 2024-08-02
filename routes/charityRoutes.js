// importing the Express module to access express.Router class
const express = require('express');
const router = express.Router();
const {login} = require('../auth/auth');
const {verify} =require('../auth/auth');

// importing controller
const controller = require('../controllers/charityControllers.js');


//           REQUEST HANDLERS           //

// request handler for application root
router.get("/", controller.landing_page);

// request handler for items page
router.get('/items', controller.item_list);

// request handler for add item page
router.get('/items/add', verify, controller.add_item);
router.post('/items/add', verify, controller.post_new_entry);

// request handler for about page
router.get('/about', controller.about);

// request handler to get entries by specific user
router.get('/entriesByUser', controller.get_entries_by_user);


// request handler for staff login page
router.get('/login', controller.show_login_page); 

// request handler for staff logout page
router.get("/logout",verify, controller.logout); 

router.get("/loggedIn",verify, controller.loggedIn_landing);



// TODO - LET ADMINS CREATE NEW USER //////////////////////////////////////
router.post('/admin/addVolunteer', controller.post_new_user); 


router.post('/login', login, controller.handle_login); 
    



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