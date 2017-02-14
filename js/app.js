function init(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { init: init, preload: preload, create: create, update: update, shutdown: shutdown });

	var fieldGroup = [];
	var gameBoardGrid;
	var catchMines;
	var catchBlanks;
	var restartText;

	var score = 0;
	var outlineGroup;
	var scoreText;

	function init() {
		fieldGroup = [];

	}

	function preload() {
		game.load.image('button', 'assets/images/button.png');
		game.load.image('tube', 'assets/images/tube.png');

	}

	function create() {
		var bg = game.add.graphics(0,0);
		bg.beginFill(0xFFF300);
		bg.drawRect(0,0, window.innerWidth, window.innerHeight);
		game.add.existing(bg);

		drawField();

		var style = { font: '30px Arial', fill: '#ff0044', align: 'center' };
		restartText = new Phaser.Text (this.game, 500, 100, 'Restart', style, null);
		restartText.inputEnabled = true;
		restartText.events.onInputDown.add(function (){
			console.log('onInput up');
			game.state.restart();

		});
		game.add.existing(restartText);

		var popUp = new Phaser.Text (this.game, 500, 200, 'PopUP', style, null);
		popUp.inputEnabled = true;
		popUp.events.onInputDown.add(function (){
			console.log('onInput up');
			createLevelComplete();
		}, this);

		game.add.existing(popUp);

		var killPopUp = new Phaser.Text (this.game, 500, 400, 'KillPopUp', style, null);
		killPopUp.inputEnabled = true;
		killPopUp.events.onInputDown.add(function (){
			console.log('onInput up');
			killLevelComplete()
		});

		game.add.existing(killPopUp);

		this.game.input.mouse.capture = true;

	}

	function createLevelComplete(){

		outlineGroup = new Phaser.Group(game, null, 'OutlineGroup');
		game.add.existing(outlineGroup);
		//outlineGroup.scale.set(0.1, 0.1);

		var outline = new Phaser.Graphics(game, 0, 0);
		outline.beginFill(0xffffff, 1)
		.drawRoundedRect(0, 0, 500, 500, 50)
		.endFill();

		var outlineSprite = new Phaser.Sprite(game, 300, 300, outline.generateTexture());
		outlineSprite.scale.set(0.1, 0.1);
		outlineSprite.anchor.set(0.5, 0.5);
		//game.add.existing(outlineSprite);
		outlineGroup.add(outlineSprite);

		//game.add.tween(outlineSprite.scale).to({y: 0.8, x: 0.8}, 750, Phaser.Easing.Bounce.Out, true, 0, 0, false);

		var style = { font: '60px Arial', fill: '#ff0044', align: 'center' };
		var levelComplete = new Phaser.Text (game, 200, -100, 'Complete', style, null);
		//game.add.existing(levelComplete);
		outlineGroup.add(levelComplete);

		var style = { font: '60px Arial', fill: '#ff0044', align: 'center' };
		scoreText = new Phaser.Text (game, 200, 200, 'score : ' + score.toString(), style, null);
		scoreText.scale.set(0.0, 0.0);
		scoreText.anchor.set(0.5, 0.5);
		//game.add.existing(levelComplete);
		outlineGroup.add(scoreText);

		//levelComplete.angle = -10;

		//game.add.tween(levelComplete).to({angle: 10}, 1000, Phaser.Easing.Sinusoidal.Out, true, 300, 0, false);
		//game.add.tween(levelComplete).to({y: 10}, 1000, Phaser.Easing.Elastic.Out, true, 300, 0, false);

		var button = new Phaser.Sprite(game, 150, 500, 'button');
		button.scale.set(0.0, 0.0);
		button.anchor.set(0.5, 0.5);
		//game.add.existing(button);
		outlineGroup.add(button);

		var button2 = new Phaser.Sprite(game, 450, 500, 'button');
		button2.scale.set(0.0, 0.0);
		button2.anchor.set(0.5, 0.5);
		//game.add.existing(button);
		outlineGroup.add(button2);


		var tubeLiquidGr = new Phaser.Graphics(game, 0, 0);
		tubeLiquidGr.beginFill(0xff334f, 1)
				.drawRoundedRect(0, 0, 30, 150, 50)
				.endFill();


		var tubeLiquid = new Phaser.Sprite(game, 400, 200, tubeLiquidGr.generateTexture());
		tubeLiquid.scale.set(0.0, 0.0);
		tubeLiquid.anchor.set(0.5, 1);
		//game.add.existing(outlineSprite);
		outlineGroup.add(tubeLiquid);


		var tube = new Phaser.Sprite(game, 400, 200, 'tube');
		tube.scale.set(0.0, 0.0);
		tube.anchor.set(0.5, 0.5);
		//game.add.existing(button);
		outlineGroup.add(tube);



		var popTime = 500;
		//all the tweens
	//	game.add.tween(outlineGroup.scale).to({y: 0.8, x: 0.8}, 750, Phaser.Easing.Bounce.Out, true, 0, 0, false);
		game.add.tween(outlineSprite.scale).to({y: 0.8, x: 0.8}, popTime, Phaser.Easing.Bounce.Out, true, 0, 0, false);
		game.add.tween(levelComplete).to({y: 10}, 1500, Phaser.Easing.Elastic.Out, true, popTime, 0, false);
		game.add.tween(scoreText.scale)
				.to({y: 0.8, x: 0.8}, 500, Phaser.Easing.Quadratic.Out, true, popTime, 0, false)
				.to({y: 1, x: 1}, 500, Phaser.Easing.Quadratic.Out, true, popTime, 0, false);

		scoreText.score = 0;

		game.add.tween(scoreText).to({score: 100}, 850, Phaser.Easing.Quadratic.Out, true, popTime+450, 0, false);

		game.add.tween(button.scale).to({y: 0.3, x: 0.3}, 750, Phaser.Easing.Bounce.Out, true, popTime, 0, false);

		game.add.tween(button2.scale).to({y: 0.3, x: 0.3}, 800, Phaser.Easing.Bounce.Out, true, popTime + 100, 0, false);

		game.add.tween(tube.scale).to({y: 0.3, x: 0.3}, 750, Phaser.Easing.Quadratic.Out, true, popTime, 0, false);

		game.add.tween(tubeLiquid.scale).to({y: 0.3, x: 0.3}, 850, Phaser.Easing.Quadratic.Out, true, popTime + 450, 0, false);

		console.log(game);

	}


	function update() {
		updateScore();
	}

	function updateScore() {
		if(scoreText){
			//score += 1;
			scoreText.setText('Score: ' + Math.round(scoreText.score).toString());
		}
	}


	function killLevelComplete(){
		outlineGroup.destroy();
		score  = 0;
	}

	function drawField(){
		gameBoardGrid = fieldCreation.mineLevelCreator();

		//Phaser Signals to reveal Mines and Blanks
		catchMines = new Phaser.Signal();
		catchMines.add(revealAllMines, this);

		catchBlanks = new Phaser.Signal();
		catchBlanks.add(revealAllBlanks, this);

		//global var # of Row, # of Col
		rowNumber = gameBoardGrid.length;
		colNumber = gameBoardGrid[0].length;

		var x = 0, y = 0;

		for (var i = 0; i < gameBoardGrid.length; i++){
			var fieldRow = [];
			fieldRow[i] = [];
			y += 100;
			for (var j = 0; j < gameBoardGrid[i].length; j++){

				if ( j == 0 ) {
					x = 100;
				} else {
					x += 100;
				}


				var adjacentCellCalc = cellProcessor.getSurroundings(gameBoardGrid, i, j);
				var cell = new Cell();
				cell.create(game, x, y, i, j, gameBoardGrid[i][j], catchBlanks, catchMines);
				fieldRow[i][j] = cell;

				//console.log(i, j, x, y);
				//console.log(this.gameBoardGrid[i], this.gameBoardGrid[i][j]);
			}
			fieldGroup.push(fieldRow[i]);
		}

		console.log(fieldGroup);

	}

	function revealAllMines() {
		console.log('revealAllMines called');
		console.log(fieldGroup, fieldGroup.length);
		for (var i = 0; i < fieldGroup.length; i++){
			console.log(fieldGroup[i].length, fieldGroup[i]);
			for (var j = 0; j < fieldGroup[i].length; j++){
				fieldGroup[i][j].disableInput();
				if (fieldGroup[i][j].hasMine){
					fieldGroup[i][j].showCell();
				}
			}
		}
	}

	function revealAllBlanks(row, col) {
		console.log('revealAllBlanks called');
		cellProcessor.loopOverAllNeighbors(fieldGroup, row, col);
	}

	function shutdown() {
		fieldGroup = [];
		catchMines.remove(revealAllMines, this)
	}
}
