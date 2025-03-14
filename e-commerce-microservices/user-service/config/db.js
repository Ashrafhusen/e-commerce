const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDb Connected')
        
    } catch (error) {
        console.log("MongoDB connection Failed : " , error)
        
    }
}


module.exports = connectDb;

