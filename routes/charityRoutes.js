// importing the Express module to access express.Router class
const express = require('express');
const router = express.Router();
const controller = require('../controllers/charityControllers.js');
const auth = require('../auth/auth.js');



//           REQUEST HANDLERS           //

// request handler for application root
router.get("/", controller.landing_page);

// request handler for items page
router.get('/items', controller.item_list);

// request handler for add item page
router.get('/addItem', auth.verifyVolunteer, controller.add_item);
router.post('/addItem', auth.verifyVolunteer, controller.post_new_entry);


router.get('/delete/:_id', controller.delete_item);

// request handler for about page
router.get('/about', auth.verifyAdmin, controller.about);

// request handler to get entries by specific user
router.get('/entriesByUser', controller.get_entries_by_user);


// request handler for staff login page
router.get('/login', controller.show_login_page);
router.post('/login', auth.login, controller.handle_login); 

// request handler for staff logout page
router.get("/logout", auth.verify, controller.logout); 

router.get("/loggedIn", auth.verify, controller.loggedIn_landing);



// items page (filtered by store)
router.get("/items/:store", controller.item_list);



router.get("/admin", auth.verifyAdmin, controller.show_admin);
router.get("/addUser", auth.verifyAdmin, controller.admin_add_new_user);
router.post("/addUser", auth.verifyAdmin, controller.admin_post_new_user);
    



router.get("/removeStaff/:username", auth.verifyAdmin, controller.admin_remove_staff);



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