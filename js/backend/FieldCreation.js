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

	//var basicMineBoard = [];

	return {
		fullGrid: [],

		basicMineBoard: [],

		rowList: [],

		mineLevelCreator: function () {
			this.basicMineBoard = createBasicMineBoard(Math.sqrt(16));
			console.log('minelist', this.basicMineBoard);

			var caughtMineIndex = false;

			var mines = 4;

			while (mines > 0){
				var row = randomNumGen(4);
				var column = randomNumGen(4);
				//var sample = this.basicMineBoard[randomNumGen(4)][randomNumGen(4)];
				this.basicMineBoard [row][column] = 'x';
				mines -= 1;
			}

			for (var i = 0; i < 4; i ++){
				for(var j = 0; j < 4; j ++){
					if (this.basicMineBoard[i][j] == 'x'){
						//this.basicMineBoard[i][j + 1] += 1;
						//this.basicMineBoard[i][j - 1] += 1;
						//this.basicMineBoard[i-1][j - 1] += 1;
						//this.basicMineBoard[i-1][j] += 1;
						//this.basicMineBoard[i-1][j + 1] += 1;
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

			/*for(var i = 0; i < 4; i ++){
				this.rowList[i] = [];

				//console.log('i-value', mineIndexList[i][0], i)
				if ( i == mineIndexList[i][0] ){
					caughtMineIndex = true;
					//console.log('i-true', mineIndexList[i][0])
				}

				for(var j = 0; j < 4; j ++){
					//console.log('j-value', mineIndexList[i][1], j)
					if ( caughtMineIndex && j == mineIndexList[i][1]) {
						this.rowList[i][j] = 'x';
						caughtMineIndex = false;
						//console.log('j-true', mineIndexList[i][1], j)
					} else {
						this.rowList[i][j] = 'n';
						//console.log('false', mineIndexList[i][1], j)

					}
				}

				this.fullGrid.push(this.rowList[i]);
			}*/

			//console.log(this.fullGrid);
			//console.log(mineIndexList);
			//return this.fullGrid;
			console.log('minelist_after mine', this.basicMineBoard)
			return this.basicMineBoard;
		},

		placeMines: function (rowNr, columnNr) {
			console.log(rowNr, columnNr);
			if (this.basicMineBoard[rowNr][columnNr] != 'x') {
				var tempValueStore = this.basicMineBoard[rowNr][columnNr];
				tempValueStore += 1;
				this.basicMineBoard[rowNr][columnNr] = tempValueStore;
			}
		}
	}

})();
