const itemDAO = require('../models/charityModel');
const db = new itemDAO();
const userDao = require('../models/userModel'); 


db.init();


// callback function to produce response for requests to /items
exports.item_list = function(req, res) {
    
    const store = req.params.store; // Extract store from the URL
    
    
    db.getAllItems().then((list) => {

        // Render the 'entries' view with the filtered items
        res.render('entries', {
            'entries': list,
            title: 'Viewing All Available Items'
        });
        console.log('Filtered items for store:', store);
    })
    .catch((err) => {
        console.log('Error retrieving items:', err);
        res.status(500).send('Internal Server Error');
    });
}

exports.item_list_by_store = function(req, res) {
    const store = req.params.store; // extracts store from the URL

    const userStore = req.user ? req.user.store : null; 

    let canEdit = false; // by default hides update/delete buttons

    if(store == userStore){
        canEdit = true; // user can edit if their store matches that of URL
    }

    // function to capitalize first letter of store
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let capitalisedStore = capitalizeFirstLetter(store);
    
    db.getAllItems().then((list) => {
        let filteredItems = list.filter(item => item.store === store);


        // Render the 'entries' view with the filtered items
        res.render('entries', {
            'entries': filteredItems,
            canEdit: canEdit,
            title: ('Viewing ' + capitalisedStore + ' Store Items'),
            user: req.user
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
    res.redirect('/items');
}





exports.about = function(req, res){
    res.render('about', {
        'user': 'user'
    });
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
    //res.redirect(`/items/${encodeURIComponent(store)}`);
    res.redirect('/items');
}



exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    console.log("PAYLOAD STORE:", req.body.store);
    store = req.user.store;
    if (!req.body.name) {
    res.status(400).send("Entries must have an author.");
    return;
    }
    db.addItem(req.body.name, req.body.description, req.body.price, req.user.store, req.user.username, req.body.tag);
    res.redirect(`/items/${encodeURIComponent(store)}`);
}




exports.update_item = function(req, res){
    console.log("SHOWING UPDATE PAGE");
    res.render('updateEntry');
}

exports.confirm_update= function(req, res){
    console.log("CONFIRMING UPDATE");
    let _id = req.params._id;
    db.updateItem(_id, req.body.name, req.body.description, req.body.price, req.body.tag);
    //res.redirect(`/items/${encodeURIComponent(store)}`);
    res.redirect('/items');
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
    console.log("POSTING NEW USER");
    const user = req.body.username;
    const password = req.body.pass;
    const role = 'volunteer';
    const store = req.body.store;
       
    if (!user || !password) {
        res.send(401, "no user or no password");
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password, role, store);

        
    
        
    });

    // Implements a 50ms delay before redirecting to /admin page
        // This allows for the getAllUsers() function in userModel.js to execute and update list of users before redirecting
        setTimeout(function() {
            res.redirect('/admin');
        }, 50); 
    
    
};

 


exports.admin_remove_staff=function(req, res){
    // get username from url
    const username = req.params.username;
    userDao.removeStaff(username);
    console.log("STAFF MEMBER ", username, " REMOVED");
    res.redirect('/admin');
    
}



