var Game = function(cnv) {
	this.board = new Board(360, 360, '#ffce9e', '#d18b47');
	this.canvas = cnv;
	this.ctx = this.canvas.getContext('2d');
	this.players = [];
	
	this.moveFrom;
	this.moveTo;
}

Game.prototype.initGame = function() {
	this.board.initBoard();
	
	white = new Player(Piece.WHITE, this.board);
	black = new Player(Piece.BLACK, this.board);
	
	white.initPlayer();
	black.initPlayer();
	
	this.players.push(white);
	this.players.push(black);
	
	this.canvas.addEventListener('click', this.action, false);
	
	//this.board.turnBoard();
	this.board.draw(this.ctx);
}

Game.prototype.click = function(e) {
	if (this.moveFrom == null) {
		point = this.board.squareClicked(e.offsetX, e.offsetY);
		piece = this.board.getPiece(point[0], point[1]);
		if (piece && piece.getColour() == this.players[0].colour) {
			this.moveFrom = point;
			this.board.from = point;
			this.board.to = [];
			this.board.draw(this.ctx);
		}
	} else {
		this.moveTo = this.board.squareClicked(e.offsetX, e.offsetY);
		
		this.players[0].move(this.moveFrom[0], this.moveFrom[1], this.moveTo[0], this.moveTo[1]);
		
		this.board.draw(this.ctx);
		
		this.players.reverse();
		this.moveFrom = null;
		this.moveTo = null;
	}
}

Game.prototype.action = function(e) {
	game.click(e);
}