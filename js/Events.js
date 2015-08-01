function bindEvent(el, eventName, eventHandler) {
  if (el.addEventListener){
    el.addEventListener(eventName, eventHandler, false);
  } else if (el.attachEvent){
    el.attachEvent('on'+eventName, eventHandler);
  }
}

bindEvent(document,'keyup',function(e){
  switch (e.keyCode) {
    case 38:
      Maze.turn(Utilities.directions.UP);
      break;
    case 40:
      Maze.turn(Utilities.directions.DN);
      break;
    case 37:
      Maze.turn(Utilities.directions.LT);
      break;
    case 39:
      Maze.turn(Utilities.directions.RT);
      break;
  }
})
