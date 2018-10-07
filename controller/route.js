var express = require('express');
var router = express.Router();

router.route('/').get(function(req,res){
    
    
    res.render('index');
});

router.route('/question').post(function(req,res){
    
   var user= req.body.user;
    console.log(req.body);
    req.session={
        name : user,
        authorized:true
    };
    
    res.render('question',{user:req.session.name});
});

router.route('/play').get(function(req,res){
    
    
    res.render('play');
});

router.route('/result').post(function(req,res){
    
    
    res.render('result');
});

router.route('/history').get(function(req,res){
    
    
    res.render('history');
});

module.exports=router;