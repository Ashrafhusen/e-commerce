const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const redisClient = require("./config/redis");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Cart Service running on port ${PORT}`));
