var fs = require("fs");

var srcfile = fs.createReadStream('README.md');
var destfile = fs.createWriteStream('README_COPY.md');
srcfile.pipe(destfile);