var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//静态资源托管
app.use('template',express.static(path.join(__dirname, 'public','template')));
app.use('admin',express.static(path.join(__dirname, 'public','admin')));
app.use('',express.static(path.join(__dirname, 'public')));


//现在我需要上传我的文件  但是我需要把我的文件上传到指定的位置 
//所以我需要把位置指定一下
let multer = require('multer')
let storage = multer.diskStorage({
    destination:function(req,file,cb){
      if(req.url.indexOf('user') !== -1 || req.url.indexOf('reg') !== -1){
        cb(null,path.join(__dirname,'public','upload','user'))
      }else if(req.url.indexOf('banner') !== -1){
        cb(null,path.join(__dirname,'public','upload','banner'))
      }else{
        cb(null,path.join(__dirname,'public','upload','product'))
      }
    }
})
let objMulter = multer({storage})
app.use(objMulter.any())


//客户端接口

//允许所有接口访问
app.use(cors({
  //允许所有前端域名
  "origin": ["http://localhost:8848","http://localhost:5000","http://localhost:8080"],  
  "credentials":true,//允许携带凭证
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //被允许的提交方式
  "allowedHeaders":['Content-Type','Authorization','token']//被允许的post方式的请求头
}));



// 这里建立一个 能够卡住 所有接口的通道
//我们使用all方法 卡住所有接口来判断token
//以此来检验权限 看看到底有没有登陆
app.all('/api/*',require('./routes/api/params'))

app.use('/api/goods',require('./routes/api/goods'))
app.use('/api/reg',require('./routes/api/reg'))
app.use('/api/login',require('./routes/api/login'))
app.use('/api/logout',require('./routes/api/loginout'))
app.use('/api/user',require('./routes/api/user'))
app.use('/api/banner',require('./routes/api/banner'))
app.use('/api/inster',require('./routes/api/inster'))
app.use('/api/del',require('./routes/api/del'))
app.use('/api/userDel',require('./routes/api/userDel'))



//代理端接口

//推送端接口



// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
