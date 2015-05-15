var http = require('http'); // Require modules

var server = http.createServer(function(request, response){
  response.writeHead(200); // status code in header
  response.write('Hello world!!!\n'); // response body
  response.end(); // close conection
}).listen(8080);
console.log('Listening on port 8080...');