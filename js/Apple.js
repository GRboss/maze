var Apple = function() {

};

Apple.prototype = Object.create(new Fruit());

Apple.prototype.type = 'Apple';

Apple.prototype.power = 6;

Apple.prototype.getElement = function() {
	var el = document.createTextNode('A');
	return el;
};
