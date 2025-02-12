const express = require("express");
const verifyToken = require("../middleWare/authMiddleware");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Public routes
router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // Get a single product by ID

// Protected routes (Require authentication)
router.post("/", verifyToken, createProduct); // Create a new product
router.put("/:id", verifyToken, updateProduct); // Update an existing product
router.delete("/:id", verifyToken, deleteProduct); // Delete a product

module.exports = router;
