const redisClient = require("../config/redis");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    const cartKey = `cart:${userId}`;

    if (redisClient.status !== "ready") { // ✅ More reliable Redis check
      return res.status(500).json({ message: "Redis connection lost. Try again later." });
    }

    // ✅ Check if item exists in cart and update quantity instead of overwriting
    const existingQuantity = await redisClient.hGet(cartKey, productId);
    const newQuantity = existingQuantity ? parseInt(existingQuantity) + quantity : quantity;
    
    await redisClient.hSet(cartKey, productId, newQuantity);
    return res.json({ message: "Item Added to Cart", productId, quantity: newQuantity });
  } catch (error) {
    console.error("❌ Error Adding to Cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartKey = `cart:${userId}`;

    if (redisClient.status !== "ready") { // ✅ More reliable Redis check
      return res.status(500).json({ message: "Redis connection lost. Try again later." });
    }

    const cartItems = await redisClient.hGetAll(cartKey);
    return res.json(cartItems);
  } catch (error) {
    console.error("❌ Error Retrieving Cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;
    const cartKey = `cart:${userId}`;

    if (redisClient.status !== "ready") { // ✅ More reliable Redis check
      return res.status(500).json({ message: "Redis connection lost. Try again later." });
    }

    await redisClient.hDel(cartKey, productId);
    return res.json({ message: "Item Removed From Cart", productId });
  } catch (error) {
    console.error("❌ Error Removing From Cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartKey = `cart:${userId}`;

    if (redisClient.status !== "ready") { // ✅ More reliable Redis check
      return res.status(500).json({ message: "Redis connection lost. Try again later." });
    }

    await redisClient.del(cartKey);
    return res.json({ message: "Cart Cleared" });
  } catch (error) {
    console.error("❌ Error Clearing Cart:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
