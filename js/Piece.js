var Piece = function(colour, piece) {
	this.colour = colour;
	this.piece = piece;	
}

Piece.WHITE = 'White';
Piece.BLACK = 'Black';

Piece.KING = 'King';
Piece.ROOK = 'Rook';
Piece.BISHOP = 'Bishop';
Piece.QUEEN = 'Queen';
Piece.KNIGHT = 'Knight';
Piece.PAWN = 'Pawn';

Piece.prototype.draw = function(ctx, x, y) {
	img = new Image();
	filename = this.colour[0].toLowerCase()+'_'+this.piece.toLowerCase()+'.png';
	img.src = 'images/pieces/'+filename;
	img.onload = function() {
		ctx.drawImage(this, x, y);
	};
}

Piece.prototype.getColour = function() {
	return this.colour;
}