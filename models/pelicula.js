const mongoose = require('mongoose');

const generes = require(__dirname + '/../utils/generar_generes');

let plataformaSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 2
    },
    data: {
        type: Date,
        required: false
    },
    quantitat: {
        type: Boolean,
        default: false
    }
});

let peliculaSchema = new mongoose.Schema({
    titol: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    sinopsi: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    duracio: {
        type: Number,
        required: true,
        min: 0
    },
    genere: {
        type: String,
        required: true,
        enum: generes
    },
    imatge: {
        type: String,
        required: false
    },
    valoracio: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max: 5
    },
    plataformes: [plataformaSchema],

    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'director'
    }
});

let Pelicula = mongoose.model('pelicula', peliculaSchema);
module.exports = Pelicula;