const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true},
    password: {
        type: String,
        required: true,
        minlength: 6},
    role: {
        type: String,
        enum: ['developer', 'admin'],
        default: 'developer'},
    createdAt: {
        type: Date,
        default: Date.now},
    updatedAt: {
        type: Date,
        default: Date.now}
});

// Export the User model
module.exports = mongoose.model('User', userSchema);