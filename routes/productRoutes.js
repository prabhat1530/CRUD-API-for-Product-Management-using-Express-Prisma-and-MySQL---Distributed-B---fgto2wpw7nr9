const express = require('express');
const router = express.Router();
const validateapikey = require("../middleware/authMiddleware")
const {createProduct,getProduct,getProductById,partialUpdate,updatedProduct,deleteProduct} = require("../controllers/productControllers")
router.use(validateapikey)

router.post("/create",  createProduct); 
router.get("/get", getProduct); 
router.get("/getById/:id",  getProductById); 
router.put("/put/:id",  updatedProduct); 
router.patch("/patch/:id",  partialUpdate); 
router.delete("/delete/:id",  deleteProduct);


module.exports = router;