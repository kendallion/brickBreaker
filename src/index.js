import Game from './game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop (timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); //can remove once box2d set up

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

/**TODO
Bricks:
	multiple hits
	need a new broken brick asset
	would like to design a new brick
Powerups:
	randomly drop when destroying a brick
	paddle size, speed, multiball
Game state:
	win screen
	press space to go to next level
	press space to start
UI:
	display lives
	display # of hits
	display level number
Ball:
	directional move based on where the ball hits the paddle
	Or based on paddle speed
	ball start position? bottom middle?
collisions:
	revamp collision detection for all sides of all objects
	perhaps change from [ball, obj1] to [obj1, obj2]
Coins!:
	Each brick may drop coins
	Spend coins after a level for upgrades+
**/
