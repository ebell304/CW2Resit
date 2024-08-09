const Datastore = require("gray-nedb");
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

class UserDAO { 

    constructor(dbFilePath) { 
        if(dbFilePath) { //embedded 
            this.db = new Datastore({
                filename: dbFilePath.filename, autoload: true });
            } else { //in memory
                this.db = new Datastore();
            }
        }

        // for the demo the password is the bcrypt of the username 
        init() { 
            /*
            this.db.insert({ user: 'Peter', password:'$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C', role: 'admin', store: 'north'});
            this.db.insert({user: 'Ann', password:'$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S', role: 'volunteer', store: 'west'}); 
            */
            return this;
        } 

        create(username, password, role, store) { 
            const that = this;
            bcrypt.hash(password, saltRounds).then(function(hash){ 
                var entry = { 
                    user: username, password: hash, role: role, store: store
                }; 
                that.db.insert(entry, function (err) {
                    if (err) { console.log("Can't insert user:", username);}
                });
            }); 
        } 
        

        lookup(user, cb) { 
            this.db.find({'user':user}, function (err, entries) { 
                if (err) { return cb(null, null);   
                } else { 
                    if (entries.length == 0) { 
                        return cb(null,null);
                    } return cb(null, entries[0]);
                }
            });
        }


       
        getAllUsers() {
            return new Promise((resolve, reject) => {
            this.db.find({}, function (err, users) {
              if (err) {
                reject (err) ;
              } else {
                resolve(users);
                console.log("function getAllUsers() returns: ", users);
                
              }
            });
            });
        }


        removeStaff(user){
            return this.db.remove({user: user});
        }
        


} 
        
const dao = new UserDAO({ filename: "users.db", autoload: true }); 
dao.init();
module.exports = dao;