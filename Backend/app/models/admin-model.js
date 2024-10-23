const mongoose = require('mongoose') 
const { Schema, model } = mongoose 

const userSchema = new Schema({
   
    email: String,
    password: String,
   
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User 