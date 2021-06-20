export default class Paddle {

    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth / SCALE;
        this.gameHeight = game.gameHeight / SCALE;

        this.width = 100 / SCALE;

        this.maxSpeed = 10 / SCALE;
        this.speed = 0;

        this.startPosition = {
            x: this.gameWidth / 2,
            y: this.gameHeight * .95
        };

        this.position = {
            x: this.startPosition.x,
            y: this.startPosition.y
        };

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_kinematicBody;
        bodyDef.position.x = this.startPosition.x;
        bodyDef.position.y = this.startPosition.y;
        var fixDef = new b2FixtureDef;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(this.width, 8 / SCALE);

        this.body = game.world.CreateBody(bodyDef);
        this.body.CreateFixture(fixDef);
        this.body.SetUserData(this);
    }

    update() {
        //this.position.x += this.speed;
        this.body.SetPosition(
            new b2Vec2(
                this.body.GetPosition().x + this.speed,
                this.body.GetPosition().y
            )
        );

        if(this.body.GetPosition().x + this.width > this.gameWidth) {
            this.body.SetPosition(
                new b2Vec2(
                    this.gameWidth - this.width,
                    this.body.GetPosition().y
                )
            );
        }
        if(this.body.GetPosition().x - this.width < 0) {
            this.body.SetPosition(
                new b2Vec2(
                    0 + this.width,
                    this.body.GetPosition().y
                )
            );
        }
    }

    draw() {

    }

    moveLeft() {
        this.speed = -this.maxSpeed;
        //this.body.SetLinearVelocity(new b2Vec2(-10,0));//ApplyImpulse(new b2Vec2(-10,0), this.body.GetPosition());
    }

    moveRight() {
        this.speed = this.maxSpeed;
        //this.body.SetLinearVelocity(new b2Vec2(10,0));
    }

    stop() {
        this.speed = 0;
        //this.body.SetLinearVelocity(new b2Vec2(0,0));//ApplyImpulse(new b2Vec2(0,0), this.body.GetPosition());
    }

}
