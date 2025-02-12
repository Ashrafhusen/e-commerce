const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    // Ensure 'Bearer ' is removed before verifying the token
    const cleanedToken = token.replace("Bearer ", "");

    console.log("🔹 Received Token:", cleanedToken);
    console.log("🔹 JWT_SECRET in Cart Service:", process.env.JWT_SECRET);

    const verified = jwt.verify(cleanedToken, process.env.JWT_SECRET);
    console.log("🔹 Verified Token Payload:", verified);

    req.user = verified;
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);
    res.status(403).json({ message: "Invalid or Expired Token", error: error.message });
  }
};

module.exports = verifyToken;
