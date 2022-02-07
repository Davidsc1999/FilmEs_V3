const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const public = require(__dirname + '/routes/public');
const pelicules = require(__dirname + '/routes/pelicules');
const auth = require(__dirname + '/routes/auth');
const directors = require(__dirname + '/routes/directors');


mongoose.connect('mongodb://localhost:27017/FilmEsV3', { useNewUrlParser: true, useUnifiedTopology: true });

let app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(methodOverride('_method'));

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', public);

app.use('/admin', pelicules);
app.use('/auth', auth);
app.use('/directors', directors);

app.listen(8080);