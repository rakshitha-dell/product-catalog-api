// Simple Product Catalog API using Express
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory product data (at least 5 products, 3 categories, mixed inStock)
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 45000, inStock: true },
  { id: 2, name: 'Bluetooth Headphones', category: 'Accessories', price: 2500, inStock: true },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 8000, inStock: false },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 25000, inStock: true },
  { id: 5, name: 'Coffee Table', category: 'Furniture', price: 5500, inStock: false },
  { id: 6, name: 'USB-C Cable', category: 'Accessories', price: 499, inStock: true }
];

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

//GET /products — return all products
app.get('/products',(rq,res) =>{
    res.send(products);
})

app.get('/products/categories', (req, res) => {
  // Extract categories from the products array
  const categories = [...new Set(products.map(p => p.category))];

  // Return them as an object
  res.json({ categories });
});

// GET /products/instock — return only products with inStock === true
app.get('/products/instock', (req, res) => {
  const inStockProducts = products.filter(p => p.inStock === true);
  res.json(inStockProducts);
});


//start the server
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})