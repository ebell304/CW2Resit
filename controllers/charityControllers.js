
// callback function to produce response for requests to /items
exports.item_list = function(req, res) {
    res.send('<h1>Available Items</h1><p>Not yet implemented: will show a list of available items.</p>');
}

// callback function for website root
exports.landing_page = function(req, res) {
    res.send('<h1>Welcome to the charity shop application.</h1>');
}

// callback function for add item page
exports.add_item = function(req, res){
    res.send('<h1>Not yet implemented: show a new entry page.</h1>');
}


exports.about = function(req, res){
    res.send('<h1>ABOUT US: Not yet implemented.</h1>');
}