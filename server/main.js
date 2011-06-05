var ws = require('websocket-server');
var players = {};
var number_of_players = 0;
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
			number_of_players += 2;
			socket.send(white, JSON.stringify({type: 1, data: 'White'}));
			socket.send(black, JSON.stringify({type: 1, data: 'Black'}));
		}
		else {
			waitingPlayers.push(client.id);
			client.write(JSON.stringify({type: 2, data: null}));
		}
		
		console.log(players);
		console.log(waitingPlayers);
			
		client.addListener('message', function(message) {
			console.log(client.id+' moves: '+message);
			socket.send(players[client.id]['opponent'], message);
		});
		
		client.addListener('close', function() {
			console.log(client.id+' has closed connection');
			
			// only if was connected to another player
			if (number_of_players > 0)
			{
				opponent = players[client.id]['opponent'];
				socket.send(opponent, JSON.stringify({type: 4, data: null}));
				waitingPlayers.push(opponent);
				delete players[opponent];
				delete players[client.id];
				number_of_players -= 2;
			}
			else
			{
				waitingPlayers.shift();
			}
						
			console.log(number_of_players);
			console.log(players);
			console.log(waitingPlayers);
			
		});
	});
	
	socket.listen(443);
}

init();