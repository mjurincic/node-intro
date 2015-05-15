var http = require("http");

http.createServer(function(request, response) {
response.writeHead(200);
request.on('readable', function() {
  var chunk = null;
  while (null !== (chunk = request.read())) {
    response.write(chunk);
  }
});
request.on('end', function() {
  response.end();
});
}).listen(8080);
console.log('Listening on port 8080...');

console.log(process.env.PORT);
console.log(process.env.IP);