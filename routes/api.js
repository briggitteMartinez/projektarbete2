//Hanterar HTTP-förfrågningar och svar.
// Innehåller rutter för att hämta och lägga till produkter i databasen
var express = require('express');
var router = express.Router();
var { db, importProducts } = require('../public/javascripts/db'); // Importera databasen och importfunktionen



// GET // Hämta produkter från databasen
router.get('/', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM productDetails').all();
    res.json(rows); // Returnerar produkterna som JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /api/import - Tar emot JSON-data och lägger in i databasen
router.post('/import', (req, res) => {
  try {
    const products = req.body; // Hämta JSON-data från förfrågan
    console.log('Mottagen JSON:', products);

    // Importera datan till databasen
    importProducts(products);

    res.status(201).json({ message: 'Produkter importerades framgångsrikt!' });
  } catch (err) {
    console.error('Fel vid import:', err.message);
    res.status(500).json({ error: err.message });
  }
});



// POST // Lägg till en ny produkt i databasen och returnera den lagrade datan
router.post('/', (req, res) => {
  const { name, price, description, image, category, size, color, brand, sku, slug } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO productDetails (name, price, description, image, category, size, color, brand, sku, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(name, price, description, image, category, size, color, brand, sku, slug);
    const newProduct = db.prepare('SELECT * FROM productDetails WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newProduct); // Returnerar den lagrade produkten som JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET // Hämta produkter och rendera edit.ejs
router.get('/edit', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM productDetails').all();
    res.render('edit', { products: rows }); // Skickar produkterna till edit.ejs
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;