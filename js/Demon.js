//https://en.wikipedia.org/wiki/Demon
var Demon = function() {

};

Demon.prototype = Object.create(new Monster());

Demon.prototype.type = 'Demon';

Demon.prototype.kill = function() {
  alert("A Demon is killed");
};

Demon.prototype.getElement = function() {
  var el = document.createTextNode('D');
  return el;
};
