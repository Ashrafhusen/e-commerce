const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyToken, addToCart);  // Add item to cart
router.get("/", verifyToken, getCart);         // Get user cart
router.delete("/remove/:productId", verifyToken, removeFromCart); // Remove item from cart
router.delete("/clear", verifyToken, clearCart); // Clear entire cart

module.exports = router;
