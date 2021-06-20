import { setUpDebugDraw } from './physics.js';
import Wall from './wall.js';
import BadWall from './badWall.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import InputHandler from './inputHandler.js';
import Brick from './brick.js';
import BallAngleSelector from './ballAngleSelector.js';
import { buildLevel, level1, level2, level3 } from './levels.js';
import { toRadians } from './mathHandler.js';

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
	NEWLEVEL: 4,
	BALLLAUNCH: 5,
	WIN: 6
};

export default class Game {

  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

	this.world = new b2World(new b2Vec2(0,0), true);
	this.world.SetContactListener(contactListener);

	this.ball = new Ball(this);
	this.paddle = new Paddle(this);

	this.wall = new Wall(this);
	this.badWall = new BadWall(this);
	this.ballAngleSelector = new BallAngleSelector(this);

    this.gamestate = GAMESTATE.MENU;
    //this.stage = new createjs.Stage(document.getElementById("gameScreen"));

	this.resetGame();

    new InputHandler(this.paddle, this);
  }

  start() {
      if(this.gamestate === GAMESTATE.RUNNING || this.gamestate === GAMESTATE.PAUSED) return;

	  if(this.gamestate === GAMESTATE.BALLLAUNCH) {
		  this.ball.startAngle = this.ballAngleSelector.angle;
		  this.ball.body.SetLinearVelocity(new b2Vec2(
			-Math.cos(toRadians(this.ball.startAngle)) * this.ball.maxSpeed,
		  	-Math.sin(toRadians(this.ball.startAngle)) * this.ball.maxSpeed));
		  this.gamestate = GAMESTATE.RUNNING;
	  }

	  if(this.gamestate === GAMESTATE.WIN) {
		  this.resetGame();
		  this.gamestate = GAMESTATE.BALLLAUNCH;
	  }

	  if(this.gamestate === GAMESTATE.GAMEOVER) {
		  this.resetGame();
		  this.gamestate = GAMESTATE.BALLLAUNCH;
	  }

	  if(this.gamestate === GAMESTATE.MENU) {
		  //this.reset();
		  setUpDebugDraw(this.world);
	      //this.gameObjects = [this.ball, this.paddle];
		  this.gamestate = GAMESTATE.BALLLAUNCH;
	  }

	  if(this.gamestate === GAMESTATE.NEWLEVEL) {
		  this.reset();
		  this.bricks = buildLevel(this, this.levels[this.currentLevel]);

	  }
  }

  update(deltaTime) {
	  if(this.lives === 0) {
		  this.gamestate = GAMESTATE.GAMEOVER;
		  [...this.bricks].forEach(object => object.markedForDeletion = true);
		  [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
		  this.world.Step (1/60, 8, 2);
	      this.world.ClearForces();
	  }

      if(this.gamestate !== GAMESTATE.RUNNING) return;

      [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
      this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

	  if(this.bricks.length === 0) {
	  	if(this.currentLevel < this.levels.length - 1) {
	  		this.currentLevel++;
	  		this.gamestate = GAMESTATE.NEWLEVEL;
	  		this.start();
	  	}
	  	else {
	  		this.gamestate = GAMESTATE.WIN;
	  	}
	  }

      this.world.Step (1/60, 8, 2);
      this.world.ClearForces();
  }

  draw(ctx) {
      //stage.update();
      if(this.gamestate === GAMESTATE.RUNNING || this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.BALLLAUNCH) {
		  this.world.DrawDebugData();
          ctx.font = "15px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText("Lives: " + this.lives, .95 * this.gameWidth, .04 * this.gameHeight);
      }

	  if(this.gamestate === GAMESTATE.BALLLAUNCH){
		  this.ballAngleSelector.draw(ctx);
          ctx.font = "20px Arial";
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText("Use LEFT/RIGHT to choose ball direction", this.gameWidth / 2, this.gameHeight / 2 + 30);
		  ctx.fillText("\nPress SPACE to launch", this.gameWidth / 2, this.gameHeight / 2 + 60);

      }

      if(this.gamestate === GAMESTATE.PAUSED){
          ctx.rect(0,0,this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fill();

          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      }

      if(this.gamestate === GAMESTATE.MENU){
          ctx.rect(0,0,this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fill();

          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Press SPACE to Start", this.gameWidth / 2, this.gameHeight / 2);
      }

      if(this.gamestate === GAMESTATE.GAMEOVER){
          ctx.rect(0,0,this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fill();

          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("Game Over! Press SPACE to Try Again.", this.gameWidth / 2, this.gameHeight / 2);
      }

	  if(this.gamestate === GAMESTATE.WIN){
          ctx.rect(0,0,this.gameWidth, this.gameHeight);
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fill();

          ctx.font = "30px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("You did it!! Press SPACE to Restart.", this.gameWidth / 2, this.gameHeight / 2);
      }
	  //createjs.Ticket.addListener(this);
      //createjs.Ticker.setFPS(60);
      //createjs.Ticker.useRAF = true;
  }

  togglePause() {
      if(this.gamestate == GAMESTATE.PAUSED) {
          this.gamestate = GAMESTATE.RUNNING;
      } else if(this.gamestate == GAMESTATE.RUNNING) {
          this.gamestate = GAMESTATE.PAUSED;
      }
  }

  reset(){
	  this.ball.body.SetPosition(new b2Vec2(this.ball.startPosition.x, this.ball.startPosition.y));
	  this.ball.body.SetLinearVelocity(new b2Vec2(this.ball.speed.x, this.ball.speed.y));
	  this.paddle.stop();
	  this.paddle.body.SetPosition(new b2Vec2(this.paddle.startPosition.x, this.paddle.startPosition.y));
	  this.ballAngleSelector.angle = 90;
	  this.gamestate = GAMESTATE.BALLLAUNCH;
  }

  resetGame(){
	  this.startingLives = 3;
      this.lives = this.startingLives;
	  this.world.ClearForces();
	  this.ball.body.SetPosition(new b2Vec2(this.ball.startPosition.x, this.ball.startPosition.y));
	  this.ball.body.SetLinearVelocity(new b2Vec2(this.ball.speed.x, this.ball.speed.y));
	  this.paddle.stop();
	  this.paddle.body.SetPosition(new b2Vec2(this.paddle.startPosition.x, this.paddle.startPosition.y));
	  this.gameObjects = [this.ball, this.paddle];
	  this.ballAngleSelector.angle = 90;
      this.levels = [ level1, level2, level3 ];
  	  //this.levels = [ level1 , level2 ];
	  this.currentLevel = 0;
	  this.bricks = buildLevel(this, this.levels[this.currentLevel]);
  }

  //tick() { }
}

//I don't think this is in the right place
var contactListener = new Box2D.Dynamics.b2ContactListener;
contactListener.BeginContact = function(contact) {
  var obj1 = contact.GetFixtureA().GetBody().GetUserData();
  var obj2 = contact.GetFixtureB().GetBody().GetUserData();
  if(obj1.constructor.name == "Brick") {
      obj1.markedForDeletion = true;
  }
  if(obj1.constructor.name == "Paddle" && obj2.constructor.name == "Ball"){
      obj2.bounceOffPaddle();
  }
  else if(obj1.constructor.name == "Ball" && obj2.constructor.name == "Paddle"){
    obj1.bounceOffPaddle();
  }

  //if ball collides with wall and ball.velocity.y = 0, ball.setvelocity.y = rand(-n to n)
  if(obj1.constructor.name == "Wall" && obj2.constructor.name == "Ball"){
      if(obj2.body.GetLinearVelocity().y == 0) obj2.body.SetLinearVelocity(new b2Vec2(obj2.body.GetLinearVelocity().x, Math.random() * 2 - 1));
  }
  else if(obj1.constructor.name == "Ball" && obj2.constructor.name == "Wall"){
    if(obj1.body.GetLinearVelocity().y == 0) obj1.body.SetLinearVelocity(new b2Vec2(obj1.body.GetLinearVelocity().x, Math.random() * 2 - 1));
  }

  //badWall
  if(obj1.constructor.name == "BadWall" && obj2.constructor.name == "Ball"){
      obj2.die();
  }
  else if(obj1.constructor.name == "Ball" && obj2.constructor.name == "BadWall"){
      obj1.die();
  }
};
