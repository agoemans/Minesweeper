function init(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var fieldGroup;

	function preload() {

	}

	function create() {
		var bg = game.add.graphics(0,0);
		bg.beginFill(0xFFF300);
		bg.drawRect(0,0, window.innerWidth, window.innerHeight);
		game.add.existing(bg);

		fieldGroup = new Phaser.Group(game, null, "FieldHolder");
		game.add.existing(fieldGroup);

		drawField();

		//console.log(fieldCreation.mineLevelCreator());
	}

	function update() {
	}

	function drawField(){
		var gameBoardGrid = fieldCreation.mineLevelCreator();

		var x = 0, y = 0;

		for (var i = 0; i < gameBoardGrid.length; i++){
			y += 100;
			for (var j = 0; j < gameBoardGrid[i].length; j++){

				if ( j == 0 ) {
					x = 100;
				} else {
					x += 100;
				}


				var adjacentCellCalc = cellProcessor.getSurroundings(gameBoardGrid, i, j);
				var cell = new Cell();
				cell.create(game, x, y, gameBoardGrid[i][j], adjacentCellCalc);

				//console.log(i, j, x, y);
				//console.log(gameBoardGrid[i], gameBoardGrid[i][j]);
			}

		}

	}

	function shutdown() {
		fieldGroup.destroy();
	}
}
