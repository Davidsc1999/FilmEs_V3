const mongoose = require('mongoose');

//Definición del esquema propio de comentario
let directorSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        minlength: 5
    },
    naiximent: {
        type: Number,
        required: false
    }
});

let Director = mongoose.model('director', directorSchema);
module.exports = Director;