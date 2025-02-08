const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const connectDb = require('./config/db')
const authRoutes = require('./routes/authRoutes')


dotenv.config();
connectDb();

const app = express();

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(morgan('dev'));

app.use('/api/auth' , authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`User Service running on Port ${PORT}`));


