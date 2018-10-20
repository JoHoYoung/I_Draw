var express = require('express');
var router = express.Router();
var session = require('express-session');
router.route('/').get(function(req,res){
    
    
    res.render('index');
});

router.route('/question').post(function(req,res){
    
   var user= req.body.user;
    console.log(req.body);
    req.session.user={
        'name' : user,
        authorized:true
    };
       
    res.render('question',{user:req.session.name});

    
});

router.route('/play').get(function(req,res){
    
    console.log(req.session);
    res.render('play');
});


router.route('/history').get(function(req,res){
    
    
    res.render('history');
});

module.exports=router;