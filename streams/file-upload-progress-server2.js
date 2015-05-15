var http = require('http');
var fs = require('fs');

var server = http.createServer();
console.log("Starting up the server");
server.listen(8080);

server.on('request', function(request, response) {
    var file = fs.createWriteStream('copy.csv');
    var fileSize = request.headers['content-length'];
    var uploadedSize = 0;
    response.writeHead(200, {
        'content-type': 'text/html'
    });
    request.on('data', function(chunk) {
        uploadedSize += chunk.length;
        uploadProgress = (uploadedSize / fileSize) * 100;
        response.write(Math.round(uploadProgress) + "%" + " uploaded\n");
        var bufferStore = file.write(chunk);
        if (bufferStore == false)
            request.pause();
    });

    file.on('drain', function() {
        request.resume();
    })

    request.on('end', function() {
        response.write('Upload done!');
        response.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
        );
    })

});