var Game = function(ctx) {
	this.board = new Board(360, 360, '#ffce9e', '#d18b47');
	this.ctx = ctx;
	this.turn = Piece.WHITE;
	this.players = {};
}

Game.prototype.initGame = function() {
	this.board.initBoard();
	
	white = new Player(Piece.WHITE, this.board);
	black = new Player(Piece.BLACK, this.board);
	
	white.initPlayer();
	black.initPlayer();
	
	white.move(2, 6, 2, 4);
	
	//this.board.turnBoard();
	this.board.draw(this.ctx);
}