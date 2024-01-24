const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
})

const user = mongoose.model('User', userSchema);

module.exports = user ;

