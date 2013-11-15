var http = require('http');
var conns = 0;

http.createServer(function(req, res) {
      res.writeHead(200, {
            'Content-Type': 'text/plain'
      });
      res.end('G\'Day\n');
      conns++;
})
      .listen(8199, '0.0.0.0');

function status(interval) {
      setTimeout(function() {
            console.log('Connections/sec: ' + conns / interval);
            conns = 0;
            status(interval);
      }, interval * 1000);
}

console.log('Listening at http://127.0.0.1:8199/');

if (process.argv.length > 2) {
      var interval = process.argv[2];
      console.log('Summary every ' + interval + ' secs');
      status(interval);
}