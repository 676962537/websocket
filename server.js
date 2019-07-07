var express = require('express');
var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http);
var path = require('path');
var webpack = require("webpack");
var config = require("./webpack.base.config.js");
const middleware = require('webpack-dev-middleware');
const compiler = webpack(config);

// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'src')));
// app.use(express.static(path.join(__dirname, '')));
//当访问根目录时，返回Hello World
app.use(middleware(compiler, {
    publicPath: '/',
}));
// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/dist/index.html');
// });
io.on('connection', function(socket){
    console.log("用户已经链接")
    // console.log('a user connected');
    socket.on('event', (data) => {
        console.log(`server端收到client发送的数据,${data}`);
        // console.log("socket.id:",socket.id);
        io.emit("event", data);
    });
    // socket.on('disconnect', () => { /* … */ });
});
//启动监听，监听3000端口
http.listen(3000, function(){
    console.log('listen 3000');
});



