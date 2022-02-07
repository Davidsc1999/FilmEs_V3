const mongoose = require('mongoose');

let usuariSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
});

let Usuari = mongoose.model('usuari', usuariSchema);
module.exports = Usuari;