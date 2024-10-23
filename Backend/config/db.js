const mongoose = require('mongoose')
require('dotenv').config();
const configureDb = async()=>{
    try{
        await mongoose.connect( process.env.db)
        console.log('successfully connect to the database')
    }catch(err){
        console.log(err)
    }
}

module.exports=configureDb;