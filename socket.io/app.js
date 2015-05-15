var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];
var storeMessage = function(name, data){
    messages.push({name: name, data: data});
}

io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(name) {
        client.nickname = name;

        messages.forEach(function(message) {
            client.emit("message", message.name + ": " + message.data);
        });

        io.emit("message", client.nickname + ' joined chat'); // broadcast new user to all users
    });

    client.on('message', function(message) { // set nickname for client
        io.emit("message", client.nickname + ': ' + message); // broadcast message to all users
        storeMessage(client.nickname, message);
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);