var Player = function(colour, board) {
	this.board = board;
	this.colour = colour;
	this.capturedPieces = [];
}


// Messy for now...
Player.prototype.initPlayer = function() {
	if (this.colour == Piece.WHITE)
	{
		this.board.setPiece(new Piece(this.colour, Piece.ROOK), 0, 7);
		this.board.setPiece(new Piece(this.colour, Piece.ROOK), 7, 7);
		this.board.setPiece(new Piece(this.colour, Piece.KNIGHT), 1, 7);
		this.board.setPiece(new Piece(this.colour, Piece.KNIGHT), 6, 7);
		this.board.setPiece(new Piece(this.colour, Piece.BISHOP), 2, 7);
		this.board.setPiece(new Piece(this.colour, Piece.BISHOP), 5, 7);
		this.board.setPiece(new Piece(this.colour, Piece.QUEEN), 3, 7);
		this.board.setPiece(new Piece(this.colour, Piece.KING), 4, 7);
		
		for (var i = 0; i < 8; i++) {
			this.board.setPiece(new Piece(this.colour, Piece.PAWN), i, 6);
		}
	}
	else
	{
		this.board.setPiece(new Piece(this.colour, Piece.ROOK), 0, 0);
		this.board.setPiece(new Piece(this.colour, Piece.ROOK), 7, 0);
		this.board.setPiece(new Piece(this.colour, Piece.KNIGHT), 1, 0);
		this.board.setPiece(new Piece(this.colour, Piece.KNIGHT), 6, 0);
		this.board.setPiece(new Piece(this.colour, Piece.BISHOP), 2, 0);
		this.board.setPiece(new Piece(this.colour, Piece.BISHOP), 5, 0);
		this.board.setPiece(new Piece(this.colour, Piece.QUEEN), 3, 0);
		this.board.setPiece(new Piece(this.colour, Piece.KING), 4, 0);
		
		for (var i = 0; i < 8; i++) {
			this.board.setPiece(new Piece(this.colour, Piece.PAWN), i, 1);
		}
	}
}

Player.prototype.getColour = function() {
	return this.colour;
}

Player.prototype.move = function(from_x, from_y, to_x, to_y) {
	piece = this.board.getPiece(from_x, from_y);
	
	if (piece && piece.getColour() == this.colour)
	{
		captured = this.board.movePiece(from_x, from_y, to_x, to_y);
		if (captured)
		{
			this.capturedPieces.push(captured);
		}
		console.log(this.capturedPieces);
	}
}