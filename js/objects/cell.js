function Cell() {
	this.back = null;
	this.x = null;
	this.y = null;
	this.fieldValue = null;
	this.text = null;
	this.hasMine = false;
	this.isBlockVisible = true;
	this.adjacentCells = null;

}

Cell.prototype.create = function (game, x, y, fieldValue, adjacentCells) {
	this.x = x;
	this.y = y;

	//console.log('adjacent cells', adjacentCells);
	this.adjacentCells = adjacentCells;

	 if (fieldValue == 'x'){
		 this.hasMine = true;
	 }

	this.back = game.add.graphics(0, 0);
	this.back.beginFill(0xFFAA3);
	this.back.drawRect(x, y, 50, 80);
	this.back.inputEnabled = true;
	this.back.input.useHandCursor = true;

	this.back.events.onInputDown.add(this.onDown, this);
	this.back.events.onInputUp.add(this.onUp, this);

	game.add.existing(this.back);

	var style =
	{
		font: "105px Arial", fill: "#ff0044", align: "center"
	};

	this.text = game.add.text(x, y, fieldValue, style);
	this.text.visible = false;

};

Cell.prototype.onDown = function () {
	if(this.hasMine){
		console.log(this.hasMine);
	}
	this.back.alpha = (this.isBlockVisible ? 0 : 1);

	this.text.visible = true;

	this.isBlockVisible = !this.isBlockVisible;

};

Cell.prototype.onUp = function () {
	//this.back.alpha = 1;
};


Cell.prototype.checkForMines = function () {
	if(this.hasMine){
		var style =
		{
			font: "105px Arial", fill: "#000000", align: "center"
		};
		this.text.setStyle(style, true);
	}
};
