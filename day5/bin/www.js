

var app = require('../app');
var debug = require('debug')('day5:server');
// var http = require('http');

var fs = require('fs')


//引入 我自己写好的server 文件
var confilg = require('../confilg/server');

//获取默认 我自己写好的 端口号
var http,port,server;  

  //如果http 端口号打开了
  //我就让端口号等于 confilg.http.port
if(confilg.http.open){
  http = require('http')
  port = confilg.http.port
  server = http.createServer(app)

  //local 端口号打开了
  //我就让端口号等于 confilg.local.port
}else if(confilg.local.open){
  http = require('http')
  port = confilg.local.port
  server = http.createServer(app)

  //如果https 端口号打开了
  //我就让端口号等于 confilg.https.port
}else if(confilg.https.open){
  http = require('https')
  port = confilg.https.port
  

  //这个是https  购买后 自带的 两个文件
  let options = {
    key: fs.readFileSync('./bin/xxx.key'),
    cert: fs.readFileSync('./bin/xxx.pem')
  }
  server = http.createServer(options,app)
}

// var port = normalizePort(process.env.PORT || '9001');

//给app 主服务器 设置端口号
app.set('port', port);
//server 监听port端口号
server.listen(port);



server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
