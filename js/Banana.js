var Banana = function() {

};

Banana.prototype = Object.create(new Fruit());

Banana.prototype.type = 'Banana';

Banana.prototype.power = 8;

Banana.prototype.getElement = function() {
	var el = document.createTextNode('B');
	return el;
};
