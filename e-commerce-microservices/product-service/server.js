const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDb = require("./src/config/db");
const productRoutes = require("./src/routes/productRoutes");


dotenv.config();
connectDb()

const app = express();

app.use(express.json())


app.use(cors())
app.use(helmet())
app.use(morgan('dev'));

app.use('/api/products' , productRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT , () => console.log(`Product Serive Running on ${PORT}`))

