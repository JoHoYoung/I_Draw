var express = require('express');
var http=require('http');
var path=require('path');
var fs=require('fs');
var multer=require('multer');
var bodyParser = require('body-parser');
var static = require('serve-static');
var expressSession = require('express-session');

//유저들이 그린 그림 저장 경로 설정
// 경로 : uploads폴더
// 파일이름 : 처음에 입력한 사용자 이름 + 지금시간.

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,req.session.user.id+'-'+Date.now());
    }
});ㄴ

var upload=multer({
    storage:storage
});

var app=express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var router = require('./controller/route.js')
app.use('/', router);

//upload, public 폴더안에 있는 파일들을 사이트의 /upload 패스로 접근 할 수 있게 함
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', './views');


http.createServer(app).listen(app.get('port'),function(){
    console.log("서버시작");
})
