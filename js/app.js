function init(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var fieldGroup = [];
	var gameBoardGrid;
	var catchMines;

	function preload() {

	}

	function create() {
		var bg = game.add.graphics(0,0);
		bg.beginFill(0xFFF300);
		bg.drawRect(0,0, window.innerWidth, window.innerHeight);
		game.add.existing(bg);

		drawField();

		//console.log(fieldCreation.mineLevelCreator());
	}

	function update() {
	}

	function drawField(){
		gameBoardGrid = fieldCreation.mineLevelCreator();

		catchMines = new Phaser.Signal();
		catchMines.add(revealAllMines, this);

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
				cell.create(game, x, y, gameBoardGrid[i][j], adjacentCellCalc, catchMines);
				fieldGroup.push(cell);

				//console.log(i, j, x, y);
				//console.log(this.gameBoardGrid[i], this.gameBoardGrid[i][j]);
			}

		}

	}

	function revealAllMines() {
		console.log('revealAllMines called')
		for (var i = 0; i < fieldGroup.length; i++){
			fieldGroup[i].disableInput();
			if (fieldGroup[i].hasMine){
				fieldGroup[i].showMine();
			}
		}
	}

	function shutdown() {
		fieldGroup = [];
		catchMines.remove(revealAllMines, this)
	}
}
