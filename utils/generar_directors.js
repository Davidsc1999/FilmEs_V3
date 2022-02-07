//generar directores

const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');
mongoose.connect('mongodb://localhost:27017/FilmEsV3', { useNewUrlParser: true, useUnifiedTopology: true });
Director.collection.drop();
let dir1 = new Director({
    nom: 'domingo',
    naiximent: '1970'
});
dir1.save();
let dir2 = new Director({
    nom: 'rodero',
    naiximent: '1990'
});
dir2.save();

let dir3 = new Director({
    nom: 'jordi',
    naiximent: '1980'
});
dir3.save();

let dir4 = new Director({
    nom: 'pedro',
    naiximent: '1996'
});
dir4.save();