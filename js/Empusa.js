//https://en.wikipedia.org/wiki/Empusa
var Empusa = function() {

};

Empusa.prototype = Object.create(new Monster());

Empusa.prototype.type = 'Empusa';

Empusa.prototype.getElement = function() {
  var el = document.createTextNode('E');
  return el;
};
