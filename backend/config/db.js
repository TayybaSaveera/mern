const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose')
const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery', true);
        const con = await mongoose.connect(process.env.mongoURI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        
    }
}

module.exports= connectDB