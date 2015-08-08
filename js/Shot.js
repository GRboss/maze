var Shot = function() {

};

Shot.prototype = Object.create(new MovingObject());

Shot.prototype.type = 'Shot';

Shot.prototype.hurtForce = 10;

Shot.prototype.getElement = function() {
	var el = document.createTextNode('S');
	return el;
};
