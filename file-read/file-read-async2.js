var fs = require('fs');
console.time('runime');

var callback = function(err, contents){
  console.log(contents);
  console.timeEnd('runime');
}
fs.readFile('/etc/hosts', 'utf8', callback);
fs.readFile('/etc/insserv.conf', 'utf8', callback);
console.timeEnd('runime');


