var Shot = function() {

};

Shot.prototype = Object.create(new MovingObject());

Shot.prototype.type = 'Shot';

Shot.prototype.hurtForce = -20;

Shot.prototype.getHurtForce = function() {
	return this.hurtForce;
};

Shot.prototype.getElement = function() {
	var el = document.createTextNode('\u2022');
	return el;
};
