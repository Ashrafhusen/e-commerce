const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "127.0.0.1", // or 'localhost'
    port: 6379,
  },
});

// Event listeners for better error handling
redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
  if (err.code === "ECONNREFUSED") {
    console.error("❌ Redis Connection Refused. Is Redis running?");
    process.exit(1); // Exit process if Redis is unreachable
  }
});

redisClient.on("connect", () => console.log("✅ Redis Connected Successfully"));
redisClient.on("ready", () => console.log("🚀 Redis Ready to Use"));
redisClient.on("end", () => console.log("⚠️ Redis Connection Closed"));

// Function to connect to Redis safely
const connectRedis = async () => {
  try {
    if (redisClient.status === "connecting" || redisClient.status === "ready") {
      console.log("ℹ️ Redis is already connected or connecting. Skipping reconnection.");
      return;
    }

    await redisClient.connect();
    console.log("✅ Redis Connected Successfully");
  } catch (error) {
    console.error("❌ Failed to connect to Redis:", error);
    process.exit(1); // Exit if Redis fails
  }
};

// Connect Redis only if it's not already connecting or connected
connectRedis();

module.exports = redisClient;
