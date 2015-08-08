var Maze = (function(){
	var _options = {};
	var _maze = [];
	var _movingObjects = [];
	var _occupiedPositions = [];
	var _lastDirection = null;

	var setDimentions = function(width, height) {
		_options.width = width;
		_options.height = height;
	};

	var setSettings = function(config) {
		_options.openings = config.openings;
		_options.exit = config.exit;
	};

	var _isPositionIsOccupied = function(obj) {
		for(var i=0; i<_occupiedPositions.length; i++) {
			if(_occupiedPositions[i].x === obj.x && _occupiedPositions[i].y === obj.y) {
				return true;
			}
		}
		return false;
	};

	var _addOccupiedPosition = function(obj) {
		_occupiedPositions.push(obj);
	};

	var _removeOccupiedPosition = function(obj) {
		for(var i=0; i<_occupiedPositions.length; i++) {
			if(_occupiedPositions[i].x === obj.x && _occupiedPositions[i].y === obj.y) {
				_occupiedPositions.splice(i, 1);
			}
		}
	};

	var create = function() {
		var table = document.createElement('table');
		table.setAttribute('cellpadding','0');
		table.setAttribute('cellspacing','0');
		table.className = 'mazeTable'
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
					openingsOn: openings,
					isExit: (j===_options.exit.x && i===_options.exit.y ? true : false)
				});

				td = room.getElement();

				_maze.push({
					i: i,
					j: j,
					room: room,
					td: td
				});

				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		var divWrapper = document.getElementById('mazeDiv');
		divWrapper.appendChild(table);

		// Moving Objects
		var hero = new Hero();
		hero.create({
			x: 0,
			y: 0,
			health: 100,
			maxX: _options.width-1,
			maxY: _options.height-1,
			number: 0
		});
		var td = getTdAt({x:0,y:0});
		td.appendChild(hero.getElement());
		_movingObjects.push(hero);
		_addOccupiedPosition({x:0,y:0});
		_createScoreRow(hero,0);

		var monster,x,y = null;
		for(var i=0; i<10; i++) {
			var number = Utilities.random(3);
			switch (number) {
				case 1:
					do {
						x = Utilities.random(_options.width)-1;
						y = Utilities.random(_options.height)-1;
					} while(_isPositionIsOccupied({x:x,y:y}));
					_addOccupiedPosition({x:x,y:y});
					monster = new Campe();
					monster.create({
						x: x,
						y: y,
						health: 70,
						maxX: _options.width-1,
						maxY: _options.height-1,
						number: i
					});
					break;
				case 2:
					do {
						x = Utilities.random(_options.width)-1;
						y = Utilities.random(_options.height)-1;
					} while(_isPositionIsOccupied({x:x,y:y}));
					_addOccupiedPosition({x:x,y:y});
					monster = new Demon();
					monster.create({
						x: x,
						y: y,
						health: 80,
						maxX: _options.width-1,
						maxY: _options.height-1,
						number: i
					});
					break;
				case 3:
					do {
						x = Utilities.random(_options.width)-1;
						y = Utilities.random(_options.height)-1;
					} while(_isPositionIsOccupied({x:x,y:y}));
					_addOccupiedPosition({x:x,y:y});
					monster = new Empusa();
					monster.create({
						x: x,
						y: y,
						health: 90,
						maxX: _options.width-1,
						maxY: _options.height-1,
						number: i
					});
					break;
			}
			td = getTdAt({x:x,y:y});
			td.appendChild(monster.getElement());
			_movingObjects.push(monster);
			_createScoreRow(monster,i);
		}
	};

	var turn = function(direction) {
		_lastDirection = direction;
		for(var m=0; m<_movingObjects.length; m++) {
			var object = _movingObjects[m];
			switch (object.getType()) {
				case 'Hero':
					_goToNextPosition(direction,object);
					break;
				case 'Campe':
				case 'Demon':
				case 'Empusa':
					_makeRandomMove(object);
					break;
			}
		}
	};

	var _goToNextPosition = function(direction,movingObject) {
		var currentPosition = movingObject.getPosition();
		var nextPosition = null;
		var room = getRoomAt(currentPosition);
		var td = getTdAt(currentPosition);

		if(moveAllowed(direction,room.openingsOn)) {
			_removeOccupiedPosition(currentPosition);
			td.innerHTML = '';
			switch (direction) {
				case Utilities.directions.UP:
					nextPosition = movingObject.moveUp();
					break;
				case Utilities.directions.DN:
					nextPosition = movingObject.moveDown();
					break;
				case Utilities.directions.LT:
					nextPosition = movingObject.moveLeft();
					break;
				case Utilities.directions.RT:
					nextPosition = movingObject.moveRight();
					break;
			}

			/**
			 * Check if a monster is there
			 */
			if(_checkIfMonsterThere(nextPosition)) {
				movingObject.kill();
			} else {
				room = getRoomAt(nextPosition);
				var difficalty = room.getDifficalty();
				movingObject.updateHealth(difficalty);

				td = getTdAt(nextPosition);
				td.appendChild(movingObject.getElement());
				_addOccupiedPosition(nextPosition);
				_updateMovingObjectScoreBoardEntry(movingObject);

				if(room.exit) {
					alert('You made it!');
				}
			}
		}
	};

	var getRoomAt = function(position) {
		for(var i=0; i<_maze.length; i++) {
			if(position.x === _maze[i].j && position.y === _maze[i].i) {
				return _maze[i].room;
			}
		}
		return null;
	};

	var getTdAt = function(position) {
		for(var i=0; i<_maze.length; i++) {
			if(position.x === _maze[i].j && position.y === _maze[i].i) {
				return _maze[i].td;
			}
		}
		return null;
	};

	var moveAllowed = function(direction,openingsOn) {
		for(var i=0; i<openingsOn.length; i++) {
			if(openingsOn[i] === direction) {
				return true;
			}
		}
		return false;
	};

	var _makeRandomMove = function(movingObject) {
		var currentPosition = movingObject.getPosition();
		var nextPosition = null;
		var room = getRoomAt(currentPosition);
		var td = getTdAt(currentPosition);
		var direction = room.openingsOn[Utilities.random(room.openingsOn.length)-1];

		if(moveAllowed(direction,room.openingsOn)) {
			_removeOccupiedPosition(currentPosition);
			td.innerHTML = '';
			switch (direction) {
				case Utilities.directions.UP:
					nextPosition = movingObject.moveUp();
					break;
				case Utilities.directions.DN:
					nextPosition = movingObject.moveDown();
					break;
				case Utilities.directions.LT:
					nextPosition = movingObject.moveLeft();
					break;
				case Utilities.directions.RT:
					nextPosition = movingObject.moveRight();
					break;
			}

			/**
			 * Check if hero is there
			 */
			var heroPosition = _movingObjects[0].getPosition();
				if(heroPosition.x === nextPosition.x && heroPosition.y === nextPosition.y) {
					/**
					 * If yes, kill him
					 */
					_movingObjects[0].kill();
				} else {
					td = getTdAt(nextPosition);
					td.appendChild(movingObject.getElement());
					_addOccupiedPosition(nextPosition);
			}
		}
	};

	var _checkIfMonsterThere = function(position) {
		for(var i=1; i<_occupiedPositions.length; i++) {
			if(_occupiedPositions[i].x === position.x && _occupiedPositions[i].y === position.y) {
				return true;
			}
		}
		return false;
	};

	var getMaze = function() {
		return _maze;
	};

	var heroShoot = function() {
		var currentPosition = _movingObjects[0].getPosition();
		var room = getRoomAt(currentPosition);
		var td = getTdAt(currentPosition);
		var shootingDirection = null;
		var shot = new Shot();
		
		if(moveAllowed(_lastDirection,room.openingsOn)) {
			shootingDirection = _lastDirection;
		} else {
			shootingDirection = room.openingsOn[Utilities.random(room.openingsOn.length)-1];
		}
		console.log(shootingDirection);
		
		shot.create({
			x: currentPosition.x,
			y: currentPosition.y,
			health: 100,
			maxX: _options.width-1,
			maxY: _options.height-1,
			number: null
		});
		
		if(moveAllowed(shootingDirection,room.openingsOn)) {
			_shotTravel(shot,shootingDirection);
		}
	};
	
	var _shotTravel = function(shot,direction) {
		switch (direction) {
			case Utilities.directions.UP:
				nextPosition = shot.moveUp();
				break;
			case Utilities.directions.DN:
				nextPosition = shot.moveDown();
				break;
			case Utilities.directions.LT:
				nextPosition = shot.moveLeft();
				break;
			case Utilities.directions.RT:
				nextPosition = shot.moveRight();
				break;
		}
		
		if(nextPosition === false) {
			
		} else {
			if(_checkIfMonsterThere(nextPosition)) {
				_shotHitsMonster(shot,nextPosition);
			} else {
				var room = getRoomAt(nextPosition);
				var td = getTdAt(nextPosition);
				var element = shot.getElement();
				td.appendChild(element);
				setTimeout(function(){
					td.removeChild(element);
					if(moveAllowed(direction,room.openingsOn)) {
						_shotTravel(shot,direction);
					}
				},400);
			}
		}
	};
	
	var _shotHitsMonster = function(shot,position) {
		for(var i=1; i<_movingObjects.length; i++) {
			var pos = _movingObjects[i].getPosition();
			if(pos.x === position.x && pos.y === position.y) {
				var td = getTdAt(position);
				var hurtForce = shot.getHurtForce();
				var health = _movingObjects[i].updateHealth(hurtForce);
				_updateMovingObjectScoreBoardEntry(_movingObjects[i]);
				
				if(health <= 0) {
					while (td.firstChild) {
						td.removeChild(td.firstChild);
					}
					_movingObjects.splice(i,1);
					_removeOccupiedPosition(position);
				}
				
				break;
			}
		}
	};
	
	var _createScoreRow = function(movingObject,number) {
		var type = movingObject.getType();
		var tdName = document.createElement('td');
		var tdScore = document.createElement('td');
		var row = document.createElement('tr');
		var scoreTable = document.getElementById('healthTable');
		var score = movingObject.getHealth();
		score = document.createTextNode(score);
		tdName.className = 'movingObjectScoreName';
		tdScore.className = 'movingObjectScoreScore';
		tdScore.appendChild(score);
		var name = '';
		
		if(type === 'Hero') {
			name = document.createTextNode(type);
			tdScore.setAttribute('id',type+'_'+number);
		} else {
			name = document.createTextNode(movingObject.getType()+' '+(number+1));
			tdScore.setAttribute('id',type+'_'+number);
		}
		tdName.appendChild(name);
		
		row.appendChild(tdName);
		row.appendChild(tdScore);
		
		scoreTable.tBodies[0].appendChild(row);
	};
	
	var _updateMovingObjectScoreBoardEntry = function(object) {
		var type = object.getType();
		var id = object.getId();
		var td = document.getElementById(type+'_'+id);
		td.childNodes[0].nodeValue = object.getHealth();
	};

	return {
		setDimentions: setDimentions,
		create: create,
		setSettings: setSettings,
		getMaze: getMaze,
		turn: turn,
		heroShoot: heroShoot
	};
})();
