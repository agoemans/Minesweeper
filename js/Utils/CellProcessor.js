var cellProcessor = (function() {
	var getCell = function (matrix, row, col) {
		var noValue = null;
		var hasValue, value;
		try {
			hasValue = matrix[row][col] != 'undefined';
			value = hasValue ? matrix[row][col] : noValue;
			//console.log(hasValue, 'hasValue', matrix[row][col])
		} catch(e){
			value = noValue;
			//console.log(value, 'error', e)
		}
		return value;
	}
	return {
		getSurroundings: function(matrix, row, col){
			return {
				upRight: getCell(matrix, row - 1, col - 1),
				up: getCell(matrix, row - 1, col),
				upLeft: getCell(matrix, row - 1, col + 1),
				right: getCell(matrix, row, col + 1),
				left: getCell(matrix, row, col - 1),
				downLeft: getCell(matrix, row + 1, col - 1),
				down: getCell(matrix, row + 1, col),
				downRight: getCell(matrix, row + 1, col + 1)

			}
		}
	}
}());


