var http = require('http'); // Require modules

var server = http.createServer().listen(8080);

server.on('request', (request, response){
  response.writeHead(200); // status code in header
  response.write('Hello world!!!\n'); // response body
  response.end();
});
server.on('close', function(){ 
  console.log('Bye Bye');
});