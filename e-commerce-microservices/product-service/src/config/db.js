const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            console.log("MongoDb Connected")
        
    } catch (error) {
        console.error('MongoDb connection Failed :' , error)
        process.exit(1);
    }
}


module.exports = connectDb