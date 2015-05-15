//https://gir.me.uk/simple-node-js-tcp-proxy/
/*jshint node:true*/
'use strict';
 
var net = require('net');
 
var proxyPort = 9020;
var tcpServerPort = 9030;
 
// proxy server
var proxy = net.createServer(function (socket) {
    var client;
 
    console.log('Client connected to proxy');
 
    // Create a new connection to the TCP server
    client = net.connect(tcpServerPort);
 
    // 2-way pipe between client and TCP server
    socket.pipe(client).pipe(socket);
 
    socket.on('close', function () {
        console.log('Client disconnected from proxy');
    }); 
 
    socket.on('error', function (err) {
        console.log('Error: ' + err.soString());
    });
});
 
// a simple TCP server for testing
var server = net.createServer(function (socket) {
    console.log('Client connected to server');
 
    socket.on('close', function () {
        console.log('Client disconnected from server');
    }); 
 
    socket.on('data', function (buffer) {
        // 'echo' server
        socket.write(buffer);
    });
 
    socket.on('error', function (err) {
        console.log('Error: ' + err.soString());
    });
});