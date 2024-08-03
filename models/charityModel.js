const nedb = require('gray-nedb');

class ItemList{

    // instantiating database 
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('Database connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
    }




    init() {

        this.db.insert({
            name: 'Dress Shirt',
            description: 'White long-sleeved shirt - Large',
            price: '9.00',
            store: 'north',
            uploadedBy: 'Peter',
            uploadDate: '01/01/2024',
            tag:'clothing',
        });
        //for later debugging
        console.log('Database entry Shirt inserted');
        

        this.db.insert({
            name: 'Amadeus VHS',
            description: 'VHS copy of Amadeus (1984) - in working condition',
            price: '5.00',
            store: 'west',
            uploadedBy: 'Ann',
            uploadDate: '02/02/2024',
            tag:'media',
        });
        //for later debugging
        console.log('Database entry Amadeus VHS inserted');

        this.db.insert({
            name: 'Basketball',
            description: 'Standard orange basketball - in perfect condition.',
            price: '5.99',
            store: 'west',
            uploadedBy: 'Ann',
            uploadDate: '01/02/2024',
            tag:'sport',
        });

        this.db.insert({
            name: 'Monopoly Board Game',
            description: 'Full board game with all pieces included.',
            price: '2.50',
            store: 'west',
            uploadedBy: 'Ann',
            uploadDate: '08/02/2024',
            tag:'entertainment',
        });

        this.db.insert({
            name: 'Decorative clock',
            description: 'Modern analogue clock - in working condition',
            price: '7.50',
            store: 'west',
            uploadedBy: 'Ann',
            uploadDate: '08/02/2024',
            tag:'home',
        });
    }


    // returns all items from the database
    getAllItems() {
    
        //returns a Promise object which can be resolved or rejected
        return new Promise((resolve, reject) => {         
            // returns an error or the database entries 
            this.db.find({}, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }


    getEntriesByUser() {
        //returns a Promise object which can be resolved or rejected
        return new Promise((resolve, reject) => {
            // uses find() with custom parameter to find entries uploaded by user 'test'
            this.db.find({ uploadedBy: 'test' }, function(err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser() returns: ', entries);
                }
            })
        })
    }


    // parses data from addEntry.mustache form to add new items to the database
    addItem(name, description, price, store, uploadedBy, tag) {

        price = parseFloat(price).toFixed(2);

        var entry = {
            name: name,
            description: description,
            price: price,
            store: store,
            uploadedBy: uploadedBy,
            uploadDate: new Date().toISOString().split('T')[0],
            tag: tag
        }
        console.log('Attempting to add item to database...', entry);
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error adding item to database', subject);
            } else {
                console.log('Item successfully added to database', doc);
            }
        })
    }

    deleteItem(_id){
        return this.db.remove({_id: _id});
    }


    updateItem(_id, name, description, price, tag) {
        console.log("ATTEMPTING TO UPDATE");

        
        console.log("ID: ", _id);



        const update = {
            $set: {
              name: name,
              description: description,
              price: price,
              tag: tag
            }
          };

        console.log("UPDATED ENTRY:", update);

    
                
        
            
        db.update({ _id: _id }, {name: 'name'}, (err, numReplaced) => {
            console.log("Update callback invoked");
            if (err) {
                console.error('Error updating document:', err);
            } else {
                console.log(`Number of documents updated: ${numReplaced}`);
            }
        });
        
    }

}

// exporting ItemList class so that it can be accessed by other files
module.exports = ItemList;