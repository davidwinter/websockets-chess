var Board = function(width, height, light, dark) {
	this.ranks = new Array(8);
	
	this.width = width;
	this.height = height;
	
	this.light = light;
	this.dark = dark;
	
	this.from = [];
	this.to = [];
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
	
	captured = this.getPiece(to_x, to_y); 
	this.setPiece(piece, to_x, to_y);
	
	this.from = [from_x, from_y];
	this.to = [to_x, to_y];
	
	return captured;
}

Board.prototype.turnBoard = function() {
	for (var r = 0; r < this.ranks.length; r++) {
		this.ranks[r].reverse();
	}
	this.ranks.reverse();
}

Board.prototype.squareClicked = function(x, y) {
	x = Math.floor(x/(this.width/Board.FILES));
	y = Math.floor(y/(this.height/Board.RANKS));
	return [x,y];
}

Board.prototype.draw = function(ctx) {
	ctx.fillStyle = this.light;
	ctx.fillRect(0, 0, this.width, this.height);
	
	s_x = this.width / Board.FILES;
	s_y = this.height / Board.RANKS;
	
	ctx.fillStyle = this.dark;
	
	paint = false;
	
	for (var r = 0; r < this.ranks.length; r++) {
		for (var f = 0; f < this.ranks[r].length; f++) {
			
			coord = [f, r];

			if (coord.toString() == this.from.toString()) {
				ctx.fillStyle = 'maroon';
				paint = true;
				
			}
			
			if (coord.toString() == this.to.toString())	{
				ctx.fillStyle = 'maroon';
				paint = true;
			}
			
			if ((f + r) % 2 || paint) {
				ctx.fillRect(f * s_x, r * s_y, s_x, s_y);
				paint = false;
			}
			
			ctx.fillStyle = this.dark;
			
			piece = this.getPiece(f, r);
			if (piece)
			{
				piece.draw(ctx, f * s_x, r * s_y);
			}
		} 
	}
}