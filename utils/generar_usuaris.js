const mongoose = require('mongoose');
const Usuari = require(__dirname + '/../models/usuari');
const SHA256 = require('crypto-js/sha256');
//mongoose.connect('mongodb://localhost:27017/FilmEsV3', { useNewUrlParser: true, useUnifiedTopology: true });

Usuari.collection.drop();

let usu1 = new Usuari({
    login: 'richi',
    password: SHA256('12345678')
        //password: '12345678'
});
usu1.save();

let usu2 = new Usuari({
    login: 'laura',
    password: SHA256('87654321')
});
usu2.save();