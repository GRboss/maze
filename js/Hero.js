var Hero = function() {

};

Hero.prototype = Object.create(new MovingObject());

Hero.prototype.type = 'Hero';
