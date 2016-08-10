function Cell() {
	this.back = null;
	this.x = null;
	this.y = null;
	this.fieldValue = null;
	this.text = null;
	this.hasMine = false;

}

Cell.prototype.create = function (game, x, y, fieldValue) {
	this.x = x;
	this.y = y;
	 if (fieldValue == 'x'){
		 this.hasMine = true;
	 }

	this.back = game.add.graphics(0, 0);
	this.back.beginFill(0xFFAA3);
	this.back.drawRect(x, y, 50, 50);
	this.back.inputEnabled = true;
	this.back.input.useHandCursor = true;

	this.back.events.onInputDown.add(this.onDown, this);
	this.back.events.onInputOut.add(this.onOut, this);

	game.add.existing(this.back);

	var style =
	{
		font: "105px Arial", fill: "#ff0044", align: "center"
	};

	this.text = game.add.text(x, y, fieldValue, style);
};

Cell.prototype.onDown = function () {
	this.back.alpha = 0;
};

Cell.prototype.onOut = function () {
	this.back.alpha = 1;
};

