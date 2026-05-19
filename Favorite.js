const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'favorites.json');

module.exports = class Favorite {
  
  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      try {
        // If file is empty, parse fallback to empty array
        const data = fileContent.toString().trim() ? JSON.parse(fileContent) : [];
        cb(data);
      } catch (parseErr) {
        // If JSON is corrupted, return empty array to prevent crash
        cb([]);
      }
    });
  }

  static addtofavorites(id, cb) {
    // Ensure ID is treated consistently (usually string if coming from request params)
    const targetId = id.toString();

    fs.readFile(p, (err, fileContent) => {
      let favorites = [];
      
      if (!err && fileContent.toString().trim()) {
        try {
          favorites = JSON.parse(fileContent);
          // Map all existing IDs to strings to prevent data-type comparison issues
          favorites = favorites.map(favId => favId.toString());
        } catch (parseErr) {
          favorites = [];
        }
      }
      
      // Check for duplicate safely
      if (!favorites.includes(targetId)) {
        favorites.push(targetId);
        
        // Ensure the 'data' directory exists before writing, just in case
        const dir = path.dirname(p);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFile(p, JSON.stringify(favorites, null, 2), (err) => {
          // Pass null if no error, or the error if it fails
          cb(err); 
        });
      } else {
        // Already exists, consider it a successful "no-op" operations
        cb(null); 
      }
    });
  }
};