const Database = require('better-sqlite3');
const db = new Database('./db/products.db', { verbose: console.log });

function searchProducts(query, callback) {
  try {
    const stmt = db.prepare('SELECT * FROM productDetails WHERE name LIKE ? OR description LIKE ?');
    const results = stmt.all(`%${query}%`, `%${query}%`);
    callback(null, results);
  } catch (err) {
    callback(err);
  }
}


module.exports = {
  db: db,
  searchProducts: searchProducts
};
