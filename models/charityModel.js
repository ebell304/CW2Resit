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
            name: 'Shirt',
            description: 'White long-sleeved shirt - Large',
            price: '9.00',
            store: 'North',
            uploadedBy: 'test',
            uploadDate: '01/01/2024',
            tag:'clothing',
        });
        //for later debugging
        console.log('Database entry Shirt inserted');
        

        this.db.insert({
            name: 'Amadeus VHS',
            description: 'VHS copy of Amadeus (1984) - in working condition',
            price: '5.00',
            store: 'West',
            uploadedBy: 'test',
            uploadDate: '02/02/2024',
            tag:'media',
        });
        //for later debugging
        console.log('Database entry Amadeus VHS inserted');
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


}

// exporting ItemList class so that it can be accessed by other files
module.exports = ItemList;