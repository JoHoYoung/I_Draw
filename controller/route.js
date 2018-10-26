var express = require('express');
var router = express.Router();
var session = require('express-session');
var path = require('path');

router.route('/').get(function (req, res) {
    res.render('pages/index');
});

router.route('/question').post(function (req, res) {

    var user = req.body.user;
    console.log(req.body);
    req.session.user = {
        'name': user,
        authorized: true
    };

    res.render('question', {
        user: req.session.name
    });


});

router.route('/play').post(function (req, res) {

    var user = req.body.user;
    console.log(req.body);
    req.session.user = {
        'name': user,
        authorized: true
    };

    var probset = ['cat', 'airplane', 'rainbow']
    var pivot = 3;

    var sendset = [];
    for (let i = 0; i < 2; i++) {
        let num = Math.floor(Math.random() * pivot);
        pivot--;
        sendset.push(probset[num]);
        probset.splice(num, 1);
    }

    res.render('pages/play', {
        "problem": sendset
    });
});


router.route('/history/:page').get(function (req, res) {
    
    var skip = path.parse(req.params.page).base;
    var database = req.app.get('database');
    database.Drawdata.find({}).sort('created_at').skip((skip - 1) * 9).limit(9).exec(function (err, results) { 
    res.json(results);
 })
    
});

module.exports = router;
