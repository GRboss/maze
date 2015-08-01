var Utilities = {
  directions: {
    UP: 'UP',
    DN: 'DOWN',
    LT: 'LEFT',
    RT: 'RIGHT'
  },
  random: function(max) {
    return Math.floor(Math.random() * max) + 1;
  }
};

/*if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) {
				results.push(element);
      }
		}

		return results;
	}
}*/
