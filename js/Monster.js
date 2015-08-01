var Monster = function() {

};

Monster.prototype = Object.create(new MovingObject());

Monster.prototype.type = 'Monster';

Monster.prototype.getElement = function() {
  var el = document.createTextNode('M');
  return el;
};
