var fs = require('fs');
console.time('runime');
console.timeEnd('runime');


var contents = fs.readFileSync('/etc/hosts', 'utf8');// Stop until complete
console.log(contents);
console.timeEnd('runime');

var contents2 = fs.readFileSync('/etc/insserv.conf', 'utf8');// Stop until complete
console.log(contents2);
console.timeEnd('runime');
