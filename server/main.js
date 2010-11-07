var ws = require('websocket-server');
var players = {};
var waitingPlayers = [];

function init() {
	socket = ws.createServer();
	
	socket.addListener('listening', function() {
		console.log('listening');
	});
	
	socket.addListener('connection', function(client) {
		console.log('Connected: '+client.id);
		
		if (waitingPlayers.length > 0) {
			// Players already waiting
			white = waitingPlayers.shift();
			black = client.id;
			players[white] = {opponent: black, colour: 'Black'};
			players[black] = {opponent: white, colour: 'White'};
			socket.send(white, JSON.stringify({type: 1, data: 'White'}));
			socket.send(black, JSON.stringify({type: 1, data: 'Black'}));
		}
		else {
			waitingPlayers.push(client.id);
			client.write(JSON.stringify({type: 2, data: null}));
		}
				
		client.addListener('message', function(message) {
			console.log(client.id+' moves: '+message);
			socket.send(players[client.id]['opponent'], message);
		});
		
		client.addListener('close', function() {
			console.log(client.id+' has closed connection');
			socket.send(players[client.id]['opponent'], JSON.stringify({type: 4, data: null}));
			waitingPlayers.push(players[client.id]['opponent']);
			delete players[client.id];
		});
	});
	
	socket.listen(8000);
}

init();