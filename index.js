const express = require('express');
const productRoutes = require('./routes/productRoutes');
const validateapikey = require('./middleware/authMiddleware')
const app = express();
app.use(express.json());
// Product routes
app.use('/api/products',validateapikey, productRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;