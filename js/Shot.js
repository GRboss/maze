var Shot = (function () {
	var instance;
 
	function createInstance(config) {
		var shot = function() {

		};

		shot.prototype = Object.create(new MovingObject());

		shot.prototype.type = 'Shot';

		shot.prototype.hurtForce = -20;

		shot.prototype.getHurtForce = function() {
			return this.hurtForce;
		};

		shot.prototype.getElement = function() {
			var el = document.createTextNode('\u2022');
			return el;
		};
		
		var obj = new shot();
		obj.create(config);
		
		return obj;
	}
 
	return {
		getInstance: function (config) {
			if (!instance) {
				instance = createInstance(config);
				return instance;
			}
			return false;
		},
		removeInstance: function() {
			instance = null;
		}
	};
})();
