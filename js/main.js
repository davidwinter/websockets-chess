$(function() {
	cnv = $('#board');
	ctx = cnv.get(0).getContext('2d');
	game = new Game(ctx);
	game.initGame();
});