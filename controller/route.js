var express = require('express');
var router = express.Router();
var session = require('express-session');
router.route('/').get(function (req, res) {


    res.render('index');
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

router.route('/play').get(function (req, res) {

    var probset = ["뽀로로", "보노보노", "도라에몽", "흰둥이", "호빵맨", "둘리", "스폰지밥", "식빵맨", "미니언", "키티", "짱구"];

    var pivot = 11;

    var sendset = [];
    for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * pivot);
        pivot--;
        sendset.push(probset[num]);
        probset.splice(num, 1);

    }

    console.log(req.session);
    res.render('play', {
        problem: sendset
    });


});


router.route('/history').get(function (req, res) {
    
 var datavbase = app.get('database');
 database.Drawdata.find({},function(err,results){
     
     
     res.render('history',{data:results});
 })

    
});

module.exports = router;
