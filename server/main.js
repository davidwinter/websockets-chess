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
		}
		
		//client.send(JSON.stringify({type: 1, data: players.shift()}));
		
		client.addListener('message', function(message) {
			console.log(client.id+' moves: '+message);
			socket.send(players[client.id]['opponent'], message);
			//socket.broadcast(message);
		});
	});
	
	socket.listen(8000);
}

init();