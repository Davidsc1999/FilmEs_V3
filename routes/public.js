// peticiones GET

const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();

router.get('/', (req, res) => {
    Pelicula.find().then(resultat => {
        res.render('public_index');
    }).catch(error => {
        res.render('public_error', { error: error });
    });
});

router.get('/buscar', (req, res) => {
    if (req.query.buscar.length > 0) {
        Pelicula.find({
            titol: new RegExp(req.query.buscar, 'i')
        }).then(resultat => {
            if (resultat.length > 0) {
                res.render('public_index', { pelicules: resultat });
            } else {
                res.render('public_index', {
                    error: 'No se ha trobat cap pel.licula'
                });
            }
        }).catch(error => {
            res.render('public_error');
        });
    } else {
        res.redirect('/');
    }
});

router.get('/pelicula/:id', (req, res) => {
    Pelicula.findById(req.params.id).populate('director').then(resultat => {
        if (resultat) {
            res.render('public_pelicula', { pelicula: resultat });
        } else {
            res.render('public_error', {
                error: 'No se ha trobat la pel.licula solicitada'
            });
        }
    }).catch(error => {
        console.log(error);
        res.render('public_error');
    });
});

module.exports = router;