var express = require('express');
var http=require('http');
var path=require('path');
var fs=require('fs');
var multer=require('multer');
var bodyParser = require('body-parser');
var static = require('serve-static');
var expressSession = require('express-session');
var mongoose = require('mongoose');
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
});

var data=require('./data.js');
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

//---------------route--------------------//
app.post('/result',upload.array(result,10),function(req,res){
    var paramuser=req.session.user;
    var results=req.body.result;
    var createdat=new Date().getTime() + 1000 * 60 * 60 * 9;
    var database=req.app.get('database');
    var imagetoshow=[];
    var lookstoshow=[{},{},{},{},{},{}];
    for(let i=0;i<result.length;i++)
    {
        data.adddata(database,results[i].subject,req.session.user,req.files[i].filename,createdat,function(err,data){
        imagetoshow.push(req.files[i].filename);
        for(let j=0;j<results[i].looks.length;j++)
        {
            lookstoshow[j].push(results[i].looks[j]);
            data.looks.push(results[i].looks[j]);
         }
        
        });
    }
        //결과창으로 갈것은 방금 받은 이미지들, 결과값들
    res.render("result",{"imagetoshow":imagetoshow,"user":paramuser,"looks":lookstoshow});

});

//--------------DB연결---------------------//
var MongoClient = require('mongodb').MongoClient;

var database;
var UserSchema;
var UserModel;

function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';

    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', function () {

       createdrawdata(database);
    });

    database.on('disconnected', function () {
        
        console.log('연결 끊어짐');
        setInterval(connectDB, 5000);
    });
    app.set('database', database);
}

function createdrawdata(database) {

    database.DrawdataSchema = require('./database/drawdata').createSchema(mongoose);

    database.Drawdata = mongoose.model("drawdata", database.DrawdataSchema);
}

http.createServer(app).listen(app.get('port'),function(){
    console.log("서버시작");
    connectDB();
})
