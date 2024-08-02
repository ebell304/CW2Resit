const itemDAO = require('../models/charityModel');
const db = new itemDAO();
const userDao = require('../models/userModel'); 


db.init();


// callback function to produce response for requests to /items
exports.item_list = function(req, res) {
    
    const store = req.params.store; // Extract store from the URL
    
    db.getAllItems().then((list) => {
        let filteredItems = list;

        // Apply store filter
        if (store) {
            filteredItems = filteredItems.filter(item => item.store === store);
        }

        // Render the 'entries' view with the filtered items
        res.render('entries', {
            'title': `Items for Store: ${store}`,
            'entries': filteredItems
        });
        console.log('Filtered items for store:', store);
    })
    .catch((err) => {
        console.log('Error retrieving items:', err);
        res.status(500).send('Internal Server Error');
    });
}

exports.item_list_by_store = function(req, res) {
    const store = req.params.store; // Extract store from the URL
    
    db.getAllItems().then((list) => {
        let filteredItems = list;

        // Apply store filter
        if (store) {
            filteredItems = filteredItems.filter(item => item.store === store);
        }

        // Render the 'entries' view with the filtered items
        res.render('entries', {
            'title': `Items for Store: ${store}`,
            'entries': filteredItems
        });
        console.log('Filtered items for store:', store);
    })
    .catch((err) => {
        console.log('Error retrieving items:', err);
        res.status(500).send('Internal Server Error');
    });
}

// callback function for website root
exports.landing_page = function(req, res) {
    res.render("entries", {
        'name': 'Book',
        'description': 'An old book.',
        'price': '999.99'
        });
}





exports.about = function(req, res){
    res.send('<h1>ABOUT US: Not yet implemented.</h1>');
}




exports.get_entries_by_user = function(req, res) {
    db.getEntriesByUser();
}


// callback function for add item page
exports.add_item = function(req, res){
    res.render('addEntry', {
        'user': 'user'
    });
}


// callback function for add item page
exports.delete_item = function(req, res){
    console.log("ATTEMPTING TO REMOVE");
    let _id = req.params._id;
    console.log("ID = ", _id);
    db.deleteItem(_id);
    console.log("REMOVED");
    res.redirect('/items');
}



exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.name) {
    res.status(400).send("Entries must have an author.");
    return;
    }
    db.addItem(req.body.name, req.body.description, req.body.price, req.body.store, req.body.uploadedBy, req.body.tag);
    res.redirect("/items");
}


exports.post_new_user = function(req, res) { 
    const user = req.body.username; 
    const password = req.body.pass;
    if (!user || !password) { 
        res.send(401, 'Error processing username or password');
        return;
    }

    userDao.lookup(user, function(err, u) { 
        if (u) {
            res.send(401, "Username already exists:", user);
            return;
        }
        userDao.create(user, password); console.log("register user", user, "password", password);
        res.redirect('/admin');
    });

}


exports.show_login_page = function(req, res) {
    res.render("user/login");
};



exports.handle_login = function (req, res) {
    res.render("entries", {
        user: "user"
    }); 
}; 


exports.logout= function (req, res) {
    res
    .clearCookie("jwt")
    .status(200)
    .redirect("/");
} 



    exports.loggedIn_landing = function (req, res) {
        db.getAllEntries().then((list) => {
            res.render("entries", {
            entries: list, user: "user"
            });
        console.log("promise resolved");
        }).catch((err) => {
        console.log("promise rejected", err);
        });
    };




exports.show_admin = function (req, res) {
    userDao.getAllUsers()
    .then((list) => {
        res.render("admin", {
            title: 'Admin dashboard',
            user:"admin",
            users: list,
        });
    })
    .catch((err) => {
        console.log("promise rejected", err);
    });
};

       exports.admin_add_new_user=function(req, res){
         res.render('addUser',{ user:"admin"})
       }
       
       exports.admin_post_new_user = function (req, res) {
         const user = req.body.username;
         const password = req.body.pass;
         const role = req.body.role;
       
         if (!user || !password) {
           res.send(401, "no user or no password");
           return;
         }
         userDao.lookup(user, function (err, u) {
           if (u) {
             res.send(401, "User exists:", user);
             return;
           }
           userDao.create(user, password,role);
         });
         res.render("userAdded")
        };

 



