const Database = require('better-sqlite3');
const db = new Database('./db/products.db', { verbose: console.log });
const jsonFileUrl = '../public/data/products_20.json'; // URL till JSON-filen

const fs = require('fs');
const path = require('path');

// Function to read JSON file
function readJsonFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Path to JSON file
const jsonFilePath = path.join(__dirname, '../data/products_20.json');

// Read JSON file and log the contents
readJsonFile(jsonFilePath)
  .then(products => {
    console.log('Fetched JSON:', products);

    // Skicka JSON-datan till servern
    return fetch('http://localhost:3000/api/import',  { // Ensure the endpoint matches your server route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products), // Skicka JSON-datan
    });
  })
  .then(response => {
    if (response.ok) {
      console.log('Produkter importerades framgångsrikt!');
    } else {
      return response.json().then(err => {
        console.error('Fel vid import:', err);
      });
    }
  })
  .catch(error => {
    console.error('Fel:', error);
  });
function searchProducts(query, callback) {
  try {
    const stmt = db.prepare('SELECT * FROM productDetails WHERE name LIKE ? OR description LIKE ?');
    const results = stmt.all(`%${query}%`, `%${query}%`);
    callback(null, results);
  } catch (err) {
    callback(err);
  }
}
// Importfunktion för JSON-produkter
function importProducts(products) {
  console.log("Products:", products);
  products.forEach(product => {
    
  const stmt = db.prepare(
    `
    INSERT OR REPLACE INTO productDetails 
    (id, name, price, description, image, category, size, color, brand, sku, slug) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
    stmt.run(
      product.id,
      product.name,
      product.price,
      product.description,
      JSON.stringify(product.image),  
      product.category,
      product.size,
      product.color,
      product.brand,
      product.sku,
      product.slug
    );
  });

 
}


module.exports = {
  db: db,
  searchProducts: searchProducts,
  importProducts: importProducts
};
