var Game = function(cnv) {
	this.board = new Board(360, 360, '#ffce9e', '#d18b47');
	this.canvas = cnv;
	this.ctx = this.canvas.getContext('2d');
	this.players = [];
	
	this.player;
	
	this.moveFrom;
	this.moveTo;
	
	this.socket = new WebSocket("ws://"+document.location.host+":443");
}

Game.MESSAGE_TYPE_CONNECT = 1;
Game.MESSAGE_TYPE_WAITING_OPPONENT = 2;
Game.MESSAGE_TYPE_MOVE = 3;
Game.MESSAGE_TYPE_OPPONENT_LEFT = 4;

Game.prototype.initGame = function() {
	this.board = new Board(360, 360, '#ffce9e', '#d18b47');
	this.board.initBoard();
	
	$('#overlay').html('<p>Waiting for an opponent&hellip;</p>');
	
	this.player = null;
	this.players = [];
	
	this.moveFrom = null;
	this.moveTo = null;
	
	white = new Player(Piece.WHITE, this.board);
	black = new Player(Piece.BLACK, this.board);
	
	white.initPlayer();
	black.initPlayer();
	
	this.players.push(white);
	this.players.push(black);
	
	this.canvas.addEventListener('click', this.click, false);
	this.socket.onmessage = this.receive;
	
	//this.board.turnBoard();
	this.board.draw(this.ctx);
}

Game.prototype.move = function(move) {
	console.log(move);
	if (this.moveFrom == null) {
		console.log('Moving from');
		piece = this.board.getPiece(move[0], move[1]);
		if (piece && piece.getColour() == this.players[0].colour) {
			this.moveFrom = move;
			this.board.from = move;
			this.board.to = [];
			this.board.draw(this.ctx);
		}
	} else {
		console.log('Moving to');
		this.moveTo = move;
		
		this.players[0].move(this.moveFrom[0], this.moveFrom[1], this.moveTo[0], this.moveTo[1]);
		
		this.board.draw(this.ctx);
		
		this.players.reverse();
		this.moveFrom = null;
		this.moveTo = null;
	}
}

Game.prototype.formatMessage = function(code, data) {
	packet = {
		type: code,
		data: data
	};
	
	return JSON.stringify(packet);
}

Game.prototype.onreceive = function(data) {
	data = JSON.parse(data);
	
	switch (data['type']) {
		case Game.MESSAGE_TYPE_MOVE:
			console.log(this.player);
			console.log(data['data'][0]);
			if (this.player != data['data'][0])
			{
				this.move(data['data'][1]);
			}
			break;
		
		case Game.MESSAGE_TYPE_CONNECT:
			$('#overlay').fadeOut();
			this.initGame();
			this.player = data['data'];
			console.log(this.player);
			break;
			
		case Game.MESSAGE_TYPE_OPPONENT_LEFT:
			$('#overlay').fadeIn();
			
		default:
			break;
	}
}

Game.prototype.onclick = function(e) {
	if (this.players[0].getColour() == this.player)
	{
		move = this.board.squareClicked(e.offsetX, e.offsetY);
		this.socket.send(this.formatMessage(Game.MESSAGE_TYPE_MOVE, [this.players[0].getColour(), move]));
		this.move(move);
	}
}

Game.prototype.receive = function(message) {
	game.onreceive(message.data);
}

Game.prototype.click = function(e) {
	game.onclick(e);
}