var Board = function(width, height, light, dark) {
	this.ranks = new Array(8);
	
	this.width = width;
	this.height = height;
	
	this.light = light;
	this.dark = dark;
}

Board.RANKS = 8;
Board.FILES = 8;

Board.prototype.initBoard = function() {
	for (var i = 0; i < this.ranks.length; i++) {
		this.ranks[i] = new Array(8);
	}
}

Board.prototype.setPiece = function(piece, x, y) {
	this.ranks[y][x] = piece;
}

Board.prototype.getPiece = function(x, y) {
	return this.ranks[y][x];
}

Board.prototype.movePiece = function(from_x, from_y, to_x, to_y) {
	piece = this.getPiece(from_x, from_y);
	this.setPiece(null, from_x, from_y);
	this.setPiece(piece, to_x, to_y);
}

Board.prototype.turnBoard = function() {
	for (var r = 0; r < this.ranks.length; r++) {
		this.ranks[r].reverse();
	}
	this.ranks.reverse();
}

Board.prototype.draw = function(ctx) {
	ctx.fillStyle = this.light;
	ctx.fillRect(0, 0, this.width, this.height);
	
	s_x = this.width / Board.FILES;
	s_y = this.height / Board.RANKS;
	
	ctx.fillStyle = this.dark;
	
	for (var r = 0; r < this.ranks.length; r++) {
		for (var f = 0; f < this.ranks[r].length; f++) {
			if ((f + r) % 2) {
				ctx.fillRect(f * s_x, r * s_y, s_x, s_y);
			}
			piece = this.getPiece(f, r);
			if (piece)
			{
				piece.draw(ctx, f * s_x, r * s_y);
			}
		} 
	}
}