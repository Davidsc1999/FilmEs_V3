const express = require('express');

let autenticacion = require(__dirname + '/../utils/auth');
let Director = require(__dirname + '/../models/director');

let router = express.Router();

router.get('/', autenticacion, (req, res) => {
    Director.find().then(resultat => {
        res.render('admin_directores', { directors: resultat });
    }).catch(error => {
        res.render('admin_error');
    });
});

router.get('/nou', autenticacion, (req, res) => {
    res.render('admin_directores_form');
});

router.post('/', autenticacion, (req, res) => {
    let nouDirector = new Director({
        nom: req.body.nom,
        naiximent: req.body.naiximent
    })

    nouDirector.save().then(resultat => {
        if (resultat)
            res.redirect(req.baseUrl);
        else
            res.render('admin_error', { error: 'No s\'ha pogut insertar el director' });
    }).catch(error => {
        res.render('admin_error');
    });
});

router.get('/editar/:id', autenticacion, (req, res) => {
    Director.findById(req.params.id).then(resultat => {
        res.render('admin_directores_form', { directors: resultat });
    }).catch(error => {
        res.render('admin_error');
    })
});

router.put('/:id', autenticacion, (req, res) => {
    Director.findByIdAndUpdate(req.params.id, {
        $set: {
            nom: req.body.nom,
            naiximent: req.body.naiximent
        }
    }, { new: true }).then(resultat => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error');
    });
});

router.delete('/:id', autenticacion, (req, res) => {
    Director.findByIdAndRemove(req.params.id).then(resultat => {
        if (resultat)
            res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error');
    });
});

module.exports = router;