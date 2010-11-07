var game;

$(function() {
	canvas = $('#board').get(0);
	game = new Game(canvas);
	game.initGame();
});