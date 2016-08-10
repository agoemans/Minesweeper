var fieldCreation = (function() {
	var randomNumGen = function (num) {
		return Math.floor(Math.random() * (num - 1) + 1);
	};

	var createBasicMineBoard = function (number) {
		var mineMainList = [];

		for (var i = 0; i < number; i++){
			var rowList = [];
			rowList[i] = [];
			for (var j = 0; j < number; j++){
				rowList[i][j] = 0;
			}
			mineMainList.push(rowList[i]);
		}

		return mineMainList;
	};

	return {
		fullGrid: [],

		basicMineBoard: [],

		rowList: [],

		mineLevelCreator: function () {
			this.basicMineBoard = createBasicMineBoard(Math.sqrt(16));

			var mines = 4;

			while (mines > 0){
				var row = randomNumGen(4);
				var column = randomNumGen(4);

				this.basicMineBoard [row][column] = 'x';
				mines -= 1;
			}

			for (var i = 0; i < 4; i ++){
				for(var j = 0; j < 4; j ++){
					if (this.basicMineBoard[i][j] == 'x'){
						if( i == 1 || i == 2){
							this.placeMines(i + 1, j);
							this.placeMines(i - 1, j);


							if( j == 1 || j == 2){
								this.placeMines(i, j + 1);
								this.placeMines(i, j - 1);
								this.placeMines(i + 1, j - 1);
								this.placeMines(i + 1, j + 1);
								this.placeMines(i - 1, j - 1);
								this.placeMines(i - 1, j + 1);
							}
						}
					}
				}
			}
			return this.basicMineBoard;
		},

		placeMines: function (rowNr, columnNr) {
			if (this.basicMineBoard[rowNr][columnNr] != 'x') {
				var tempValueStore = this.basicMineBoard[rowNr][columnNr];
				tempValueStore += 1;
				this.basicMineBoard[rowNr][columnNr] = tempValueStore;
			}
		}
	}

})();
