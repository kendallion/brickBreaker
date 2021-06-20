import Paddle from "./paddle.js";
import GAMESTATE from "./game.js";

export default class InputHandler {

  constructor (paddle, game){
    document.addEventListener('keydown', event => {

      switch(event.keyCode){
        case 37:
        if(game.gamestate === 1) paddle.moveLeft(); //GAMESTATE.RUNNING
        break;

        case 39:
        if(game.gamestate === 1) paddle.moveRight(); //GAMESTATE.RUNNING
        break;

		case 27:
		      game.togglePause();
		break;
      }
    });

    document.addEventListener('keyup', event => {

      switch(event.keyCode){
        case 37:
          if(game.gamestate === 1 && paddle.speed < 0) paddle.stop(); //GAMESTATE.RUNNING

          else if(game.gamestate === 5){ //GAMESTATE.BALLLAUNCH
              game.ballAngleSelector.angleLeft();
          }
        break;

        case 39:
          if(game.gamestate === 1 && paddle.speed > 0) paddle.stop(); //GAMESTATE.RUNNING

          else if(game.gamestate === 5){ //GAMESTATE.BALLLAUNCH
              game.ballAngleSelector.angleRight();
          }
        break;

        case 32: //spacebar
			game.start();
		break;
      }
    });
  }
}
