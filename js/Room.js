var Room = function() {
  this.x = null;
  this.y = null;
  this.type = 'Room';
  this.difficalty = null;
  this.openingsOn = [];

  this.create = function(config) {
    this.x = config.x;
    this.y = config.y;
    this.openingsOn = config.openingsOn;
  };

  this.setType = function(type) {
    this.type = type;
  };

  this.getType = function() {
    return this.type;
  };

  this.getDifficalty = function() {
    return this.difficalty;
  };

  this.getElement = function() {
    var openingsClasses = '';
    for(var i=0; i<this.openingsOn.length; i++) {
      openingsClasses += ' ' + this.openingsOn[i]+'door';
    }

    var td = document.createElement('td');
    td.className = 'RoomCls '+this.type+'Cls'+' '+openingsClasses;
    return td;
  };
};
