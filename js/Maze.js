var Maze = (function(){
  var _options = {};

  var setDimentions = function(width, height) {
    _options.width = width;
    _options.height = height;
  };

  var setOpenings = function(config) {
    _options.openings = config.openings;
  };

  var create = function() {
    var table = document.createElement('table');
    table.setAttribute('cellpadding','0');
    table.setAttribute('cellspacing','0');
    for(var i=0; i<_options.height; i++){
      var tr = document.createElement('tr');
      for(var j=0; j<_options.width; j++) {
        var type = Utilities.random(3);
        var td = null, room = null;
        switch(type) {
          case 1:
            room = new MarbleRoom();
            break;
          case 2:
            room = new DirtRoom();
            break;
          case 3:
            room = new MudRoom();
            break;
        }

        var openings = [];
        for(var o=0; o<_options.openings.length; o++) {
          if(j===_options.openings[o].x && i===_options.openings[o].y) {
            for(var d=0; d<_options.openings[o].doors.length; d++) {
              switch (_options.openings[o].doors[d]) {
                case Utilities.directions.UP:
                  openings.push(Utilities.directions.UP);
                  break;
                case Utilities.directions.DN:
                  openings.push(Utilities.directions.DN);
                  break;
                case Utilities.directions.LT:
                  openings.push(Utilities.directions.LT);
                  break;
                case Utilities.directions.RT:
                  openings.push(Utilities.directions.RT);
                  break;
              }
            }
          }
        }

        room.create({
          x: j,
          y: i,
          openingsOn: openings
        });
        td = room.getElement();
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    var divWrapper = document.getElementById('mazeDiv');
    divWrapper.appendChild(table);
  };

  return {
    setDimentions: setDimentions,
    create: create,
    setOpenings: setOpenings
  };
})();
