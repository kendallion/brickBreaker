export default class Brick {
    constructor(game, position) {
        this.game = game;
        this.position = position;
        this.width = 40 / SCALE;
        this.height = 12 / SCALE;

        this.markedForDeletion = false;

        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_kinematicBody;
        bodyDef.position.x = this.position.x + this.width;
        bodyDef.position.y = this.position.y + this.height;
        var fixDef = new b2FixtureDef;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(this.width, this.height);

        this.body = game.world.CreateBody(bodyDef);
        this.body.CreateFixture(fixDef);
        this.body.SetUserData(this);
    }

    update() {
        if(this.markedForDeletion) this.game.world.DestroyBody(this.body);
    }

    draw() {

    }
}
