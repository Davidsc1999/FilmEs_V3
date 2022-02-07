const express = require('express');
const multer = require('multer');

let router = express.Router();
let Pelicula = require(__dirname + '/../models/pelicula');
let Director = require(__dirname + '/../models/director');
let autenticacion = require(__dirname + '/../utils/auth');
const generes = require(__dirname + '/../utils/generar_generes');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
});
let upload = multer({ storage: storage });


//GET /
router.get('/', autenticacion, (req, res) => {
    Pelicula.find().then(resultat => {
        res.render('admin_pelicules', { pelicules: resultat });
    }).catch(error => {
        res.render('admin_error');
    });
});
//GET /pelicules/nova

router.get('/nova', autenticacion, (req, res) => {
    Director.find().then(resultat => {
        res.render('admin_pelicules_form', { directors: resultat, generes: generes });
    });
});

//GET /pelicules/editar/:id

router.get('/editar/:id', autenticacion, (req, res) => {

    Pelicula.findById(req.params.id).populate('director').then(resultat => {
        Director.find().then(director => {
            if (resultat) {
                res.render('admin_pelicules_form', { directors: director, pelicula: resultat, generes: generes });
            } else {
                res.render('admin_error', { error: 'Pelicula no trobada' });
            }
        }).catch(error => {
            res.render('admin_error');
        })
    })
})

//POST /pelicules

router.post('/', autenticacion, upload.single('imatge'), (req, res) => {

    if (typeof req.body.quantitat === 'undefined')
        premium = false;
    else
        premium = true;

    let novaPelicula = new Pelicula({
        titol: req.body.titol,
        sinopsi: req.body.sinopsi,
        duracio: req.body.duracio,
        genere: req.body.genere,
        valoracio: req.body.valoracio,
        plataformes: {
            nom: req.body.nom,
            data: req.body.data,
            quantitat: premium
        },
        director: req.body.director
    });

    if (typeof req.file === 'undefined') {
        novaPelicula.imatge = 'pelicula.jpg';
    } else {
        novaPelicula.imatge = req.file.filename;
    }

    novaPelicula.save().then(resultat => {
        console.log(novaPelicula);
        res.redirect(req.baseUrl);
    }).catch(error => {
        console.log(error);
        res.render('admin_error');
    })
});

//PUT /pelicules/:id
router.put('/:id', autenticacion, upload.single('imatge'), (req, res) => {
    if (req.body.quantitat === 'undefined')
        premium = false
    else
        premium = true;


    if (typeof req.file === 'undefined') {
        Pelicula.findByIdAndUpdate(req.params.id, {
            $set: {
                titol: req.body.titol,
                sinopsi: req.body.sinopsi,
                duracio: req.body.duracio,
                genere: req.body.genere,
                valoracio: req.body.valoracio,
                plataformes: {
                    nom: req.body.nom,
                    data: req.body.data,
                    quantitat: premium
                },
                director: req.body.director,
            }
        }, { new: true }).then(resultat => {
            res.redirect(req.baseUrl);
        }).catch(error => {
            res.render('admin_error');
        });
    } else {
        Pelicula.findByIdAndUpdate(req.params.id, {
            $set: {
                titol: req.body.titol,
                sinopsi: req.body.sinopsi,
                duracio: req.body.duracio,
                genere: req.body.genere,
                valoracio: req.body.valoracio,
                plataformes: {
                    nom: req.body.plataformes,
                    data: req.body.data,
                    quantitat: premium
                },
                director: req.body.director,
                imatge: req.file.filename
            }
        }, { new: true }).then(resultat => {
            res.redirect(req.baseUrl);
        }).catch(error => {
            res.render('admin_error');
        });
    }

});

//DELETE /pelicules/:id
router.delete('/:id', autenticacion, (req, res) => {
    Pelicula.findByIdAndRemove(req.params.id).then(resultat => {
        if (resultat) {
            res.redirect(req.baseUrl);
        }
    }).catch(error => {
        res.render('admin_error');
    });
});

module.exports = router;