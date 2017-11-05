const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000 ;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString() ;
    var log = `${now}: ${req.method}: ${req.url}` ;
    fs.appendFile('server.log', `${log} + \n`, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
    next();
});

//app.use((req, res, next) => {
//    res.render('maintenance');
//});

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('upper', (text) => {
    return text.toUpperCase()
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        paragraph: 'Welcome to home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        paragraph: 'This is about page.'
    });
});

app.get('/profile', (req, res) => {
    res.render('portfolio',{
        pageTitle: 'My Profile',
        name: 'Sikarin Poonsawat',
        age: 21
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'something wrong!'
    });
})

app.listen(port);
console.log("Port is "+port);