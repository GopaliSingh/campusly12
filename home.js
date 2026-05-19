const path = require('path');
const fs = require('fs');
 let registeredHome = [];
 const homedatapath=path.join(__dirname,'../', 'data', 'homes.json');
// 1. Move this OUTSIDE the class at the top of the file
// This is the "memory" that clears only when you restart the server.
module.exports = class Home {
    constructor(id,productname, price, description, location, photoUrl) {
      
        this.productname = productname;
        this.price = price;
        this.description = description;
        this.location = location;
        this.photoUrl = photoUrl;
    }

    save() {
      this.id=Math.random().toString(); // This is a simple way to generate a unique ID;
  fs.readFile( 'data/homes.json', (err, fileContent) => {
   
    if (!err) {
      registeredHome = JSON.parse(fileContent);
    }
    
    registeredHome.push(this);
    fs.writeFile('data/homes.json', JSON.stringify(registeredHome), (err) => {
      if (err) {
        console.log("Error saving to file:", err);
      }
    });
  });
    }
  
  static fetchAll(cb) {
   // const p = path.join(
     // path.dirname(require.main.filename),
     // 'data',
      //'homes.json'
  //  );
    fs.readFile(homedatapath, (err, fileContent) => {
      if (err || fileContent.length === 0) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
  
  
static findbyid(id,cb)
{
this.fetchAll((homes)=>
{
const home=homes.find(h=>h.id===id);
cb(home);
}
)
}


static filterAndSort(filters, cb) {
    this.fetchAll(allHomes => {
        let filteredHomes = [...allHomes];

        // 1. Filter by Categories (handles single value or array of checked categories)
        if (filters.category) {
            const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
            filteredHomes = filteredHomes.filter(item => categories.includes(item.category));
        }

        // 2. Filter by Minimum Price
        if (filters.minPrice) {
            filteredHomes = filteredHomes.filter(item => parseFloat(item.price) >= parseFloat(filters.minPrice));
        }

        // 3. Filter by Maximum Price
        if (filters.maxPrice) {
            filteredHomes = filteredHomes.filter(item => parseFloat(item.price) <= parseFloat(filters.maxPrice));
        }

        // 4. Filter by Condition
        if (filters.condition) {
            const conditions = Array.isArray(filters.condition) ? filters.condition : [filters.condition];
            filteredHomes = filteredHomes.filter(item => conditions.includes(item.condition));
        }

        // 5. Apply Sorting Algorithms
        if (filters.sortBy) {
            if (filters.sortBy === 'priceLowHigh') {
                filteredHomes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            } else if (filters.sortBy === 'priceHighLow') {
                filteredHomes.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            } else if (filters.sortBy === 'recent') {
                // Assuming items have a unique ID or timestamp. If IDs are generated randomly, 
                // sorting by "recent" works best if you record a timestamp upon item saving.
                filteredHomes.reverse(); 
            }
        }

        // Return the final custom filtered array back via callback
        cb(filteredHomes);
    });
}
}



