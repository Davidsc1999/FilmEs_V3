const express = require('express');
let Usuari = require(__dirname + '/../models/usuari');
let router = express.Router();
const SHA256 = require("crypto-js/sha256");

//GET /login
router.get('/login', (req, res) => {
    res.render('auth_login');
});

//POST /login
router.post('/login', (req, res) => {
    Usuari.find({
        login: req.body.login,
        password: SHA256(req.body.password).toString()
    }).then(resultado => {
        if (resultado.length > 0) {
            req.session.login = resultado;
            res.redirect('/admin');
        } else {
            res.render('auth_login', {
                error: 'Usuari incorrect'
            });
        }
    }).catch(error => {
        res.render('admin_error');
    });
});

//GET /logout

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;