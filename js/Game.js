var Game = function(ctx) {
	this.board = new Board(360, 360, '#ffce9e', '#d18b47');
	this.ctx = ctx;
}

Game.prototype.initGame = function() {
	this.board.initBoard();
	q = new Piece(Piece.BLACK, Piece.QUEEN);
	this.board.setPiece(q, 1, 1);
	K = new Piece(Piece.WHITE, Piece.KING);
	this.board.setPiece(K, 7, 7);
	this.board.turnBoard();
	this.board.draw(this.ctx);
}