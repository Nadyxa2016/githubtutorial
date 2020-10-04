// // console.log("Hello World!");
// //
// // function test(){
// //   console.log("hi bro!");
// // }
// //
// // test();
// // ----------------------------------
// // var http = require('http');
// //
// // var server = http.createServer(function(req, res){
// //   console.log("URL страницы: " + req.url);
// //   res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
// //   res.end('Привет мир!');
// // });
// //
// // server.listen(3000, '127.0.0.1');
// // console.log("Мы отслеживаем порт 3000");
//
// var fs = require('fs');
//
// var myReadShort = fs.createReadStream(__dirname+'/article.txt', 'utf-8');
// var myWriteShort = fs.createWriteStream(__dirname+'/news.txt');
//
// // myReadShort.on('data', function(chunk){
// //   console.log("Новые данные получены:");
// //   myWriteShort.write(chunk);
// // });
//
// myReadShort.pipe(myWriteShort);

var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');//движок для шаблонизации

app.use('/public', express.static('public'));// подключение статических файлов

app.get('/', function(req, res){
  // res.sendFile(__dirname + "/index.html");
  res.render('index');
});
app.get('/about', function(req, res){
  // res.send('This is home');
    // res.sendFile(__dirname+"/about.html");
    res.render('about');
});
app.post('/about', urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    // res.render('about');
    res.render('about-success', {data: req.body});
});
app.get('/news/:id', function(req, res){
    // res.send('Id is - ' + req.params.id);
    // res.sendFile(__dirname+"/index.html");
    res.render('news', {newId: req.params.id});//берет шаблон файла и отображает в браузере передаая параметры
});

app.listen(3000);
