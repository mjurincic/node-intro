var fs = require('fs');

console.log("Starting to read the file");
var contents = fs.readFileSync('/etc/hosts', 'utf8');// Stop until complete
console.log(contents);
console.log("Carry on executing");

