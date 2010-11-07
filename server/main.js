var ws = require('websocket-server');
var players = ['White', 'Black'];

function init() {
	socket = ws.createServer();
	
	socket.addListener('listening', function() {
		console.log('listening');
	});
	
	socket.addListener('connection', function(client) {
		console.log('Connected: '+client.id);
		
		client.send(JSON.stringify({type: 1, data: players.shift()}));
		
		client.addListener('message', function(message) {
			console.log(client.id+' moves: '+message);
			socket.broadcast(message);
		});
	});
	
	socket.listen(8000);
}

init();