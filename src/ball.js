import { toRadians } from './mathHandler.js';

export default class Ball{

    constructor(game){
        this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;

		this.game = game;

        this.startAngle = 90;
		this.startPosition = { x: this.gameWidth / 2 / SCALE, y: .9 * this.gameHeight / SCALE };

		this.maxSpeed = 20;
		//this.speed = { x: 0, y: 0 };
        this.speed = { x: Math.cos(toRadians(this.startAngle)) * this.maxSpeed, y: -Math.sin(toRadians(this.startAngle)) * this.maxSpeed };

        this.dead = false;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.x = this.startPosition.x;
        bodyDef.position.y = this.startPosition.y;
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0;
        fixDef.restitution = 1;
        fixDef.shape = new b2CircleShape(.3);

        this.body = game.world.CreateBody(bodyDef);
        this.body.CreateFixture(fixDef);
        //this.body.SetLinearVelocity(new b2Vec2(this.speed.x, this.speed.y));
        this.body.SetUserData(this);
    }

    update() {
        /*console.log(this.body.GetLinearVelocity().x);
        console.log(this.body.GetLinearVelocity().y);
        if(this.body.GetLinearVelocity().x === 0 && this.body.GetLinearVelocity.y === 0)
        console.log("hey");
            this.body.SetLinearVelocity(new b2Vec2(this.speed.x, this.speed.y));*/
        if(this.dead) {
            this.game.reset();
            this.dead = false;
        }
    }

    draw() {

    }

    die(){
        this.game.lives--;
        this.dead = true;
    }

    bounceOffPaddle(){
        let collisionPosition = this.body.GetPosition().x - this.game.paddle.body.GetPosition().x + this.game.paddle.width;
        let angle = collisionPosition / (this.game.paddle.width * 2) * 180;

        if (angle > 165) angle = 165;
        if(angle < 15) angle = 15;
        this.body.SetLinearVelocity(new b2Vec2(-Math.cos(toRadians(angle)) * this.maxSpeed, -Math.sin(toRadians(angle)) * this.maxSpeed));
    }

}
