//https://en.wikipedia.org/wiki/Campe
var Campe = function() {

};

Campe.prototype = Object.create(new Monster());

Campe.prototype.type = 'Campe';

Campe.prototype.kill = function() {
	alert("A Campe is killed");
};

Campe.prototype.getElement = function() {
	var el = document.createTextNode('C');
	return el;
};
