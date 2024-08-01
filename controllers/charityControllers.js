const itemDAO = require('../models/charityModel');
const db = new itemDAO();


db.init();


// callback function to produce response for requests to /items
exports.item_list = function(req, res) {
    
    db.getAllItems().then((list) => {
        res.render('entries', {
            'title': 'Available Items',
            'entries': list
        });
        console.log('promise resolved');
    })
    .catch((err) => {
        console.log('promise rejected', err);
    })
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
    res.render('addEntry');
}

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.name) {
    res.status(400).send("Entries must have an author.");
    return;
    }
    db.addItem(req.body.name, req.body.description, req.body.price, req.body.store, req.body.uploadedBy, req.body.tag);
    res.redirect('/');
}