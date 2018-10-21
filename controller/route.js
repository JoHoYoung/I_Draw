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

    var probset = ["뽀로로", "보노보노", "도라에몽", "흰둥이", "호빵맨", "둘리", "스폰지밥", "식빵맨", "미니언", "키티", "짱구"];

    var pivot = 11;

    var sendset = [];
    for (let i = 0; i < 3; i++) {
        let num = Math.floor(Math.random() * pivot);
        pivot--;
        sendset.push(probset[num]);
        probset.splice(num, 1);
    }

    console.log(req.session);
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
