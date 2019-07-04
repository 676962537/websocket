var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http);
//当访问根目录时，返回Hello World
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('event', data => {
        console.log("监听client发送的数据:",data)
        io.emit("event", data)
    });
    socket.on('disconnect', () => { /* … */ });
});

//启动监听，监听3000端口
http.listen(3000, function(){
    console.log('listen 3000');
});