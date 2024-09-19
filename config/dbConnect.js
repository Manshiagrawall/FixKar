const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGO_URL;

const dbConnect= async ()=>{
    try{
        await mongoose.connect(URL);
        console.log("Connected to database successfully")
    }catch(error){
        throw error;
    }
}
module.exports = dbConnect;