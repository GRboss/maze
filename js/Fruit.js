var Fruit = function() {
	this.type = 'Fruit';
	this.x = null;
	this.y = null;
	this.power = 5;
	
	this.setPosition = function(obj) {
		this.x = obj.x;
		this.y = obj.y;
	};
	
	this.getPosition = function() {
		return {
			x: this.x,
			y: this.y
		};
	};
	
	this.getType = function() {
		return this.type;
	};
	
	this.getPower = function() {
		return this.power;
	};
	
	this.getElement = function() {
		var el = document.createTextNode('F');
		return el;
	};
};
