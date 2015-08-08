var MovingObject = function() {
	this.id = null;
	this.x = null;
	this.y = null;
	this.type = 'MovingObject';
	this.health = 100;
	this.maxX = null;
	this.maxY = null;

	this.create = function(config) {
		this.x = config.x;
		this.y = config.y;
		this.health = config.health;
		this.maxX = config.maxX;
		this.maxY = config.maxY;
		this.id = config.number;
	};
	
	this.getId = function() {
		return this.id;
	};

	this.moveUp = function() {
		if(this.y > 0) {
			this.y--;
		} else {
			return false;
		}

		return {
			x: this.x,
			y: this.y
		};
	};

	this.moveDown = function() {
		if(this.y < this.maxY) {
			this.y++;
		} else {
			return false;
		}

		return {
			x: this.x,
			y: this.y
		};
	};

	this.moveLeft = function() {
		if(this.x > 0) {
			this.x--;
		} else {
			return false;
		}

		return {
			x: this.x,
			y: this.y
		};
	};

	this.moveRight = function() {
		if(this.x < this.maxX) {
			this.x++;
		} else {
			return false;
		}

		return {
			x: this.x,
			y: this.y
		};
	};

	this.updateHealth = function(value) {
		this.health += (-1)*value;
		console.log(this.health);
		if(this.health <= 0) {
			this.kill();
		}
		return this.health;
	};
	
	this.getHealth = function() {
		return this.health;
	};

	this.getType = function() {
		return this.type;
	};

	this.getPosition = function() {
		return {
			x: this.x,
			y: this.y
		};
	};
	
	this.kill = function() {
		alert("I'm killed");	
	};

	this.getElement = function() {
		var el = document.createTextNode('MO');
		return el;
	};
};
