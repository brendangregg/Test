var mod_http = require('http');
var uri = '/';

function get(hostname, port, uri)
{
	mod_http.get({ host: hostname, port: port, path: uri },
	    function (response) {
		return (get(hostname, port, uri));
	    }
	);
}

function main()
{
	var server, parts, hostname, port;

	if (process.argv.length <= 2) {
		console.error('USAGE: node load-client.js <server>[:<port>]');
		process.exit(1);
	}

	server = process.argv[2];
	parts = server.split(':');
	hostname = parts[0];
	port = parts[1] || '80';

	console.log('Lanching load at http://%s:%s%s', hostname, port, uri);

	get(hostname, port, uri);
}

main();
