var Hero = function() {

};

Hero.prototype = Object.create(new MovingObject());

Hero.prototype.type = 'Hero';

Hero.prototype.getElement = function() {
  var el = document.createTextNode('H');
  return el;
};
