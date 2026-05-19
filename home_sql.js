const db=require('../util/databaseutil');

// 1. Move this OUTSIDE the class at the top of the file
// This is the "memory" that clears only when you restart the server.
const registeredHomes = []; 

module.exports = class Home {
    constructor(productname, price, description, location, photoUrl,id) {
        this.productname = productname;
        this.price = price;
        this.description = description;
        this.location = location;
        this.photoUrl = photoUrl;
        this.id = id;
    }

    save() {
      db.execute('INSERT INTO campus(productname, price, description, location, photoUrl,id) VALUES (${this.productname}, ${this.price}, ${this.description}, ${this.location}, ${this.photoUrl}, ${this.id})');
    }

    static fetchAll() {
  return db.execute('SELECT * FROM campus');
//returns promise;
}
static findById(homeId)
{
return db.execute('select * from campus where id=?',[homeId]);

}


static deleteById(homeId)
{
return db.execute('delete * from campus where id=?',[homeId]);

}
}

