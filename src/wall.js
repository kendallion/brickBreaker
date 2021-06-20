export default class Wall {
    constructor(game){
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        var fixDef = new b2FixtureDef;
        fixDef.shape = new b2PolygonShape;

        //top wall
        bodyDef.position.x = 0;
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(game.gameWidth / SCALE, 0);
        var body = game.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(this);

        //right wall
        bodyDef.position.x = game.gameWidth / SCALE;
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(0, game.gameHeight / SCALE);
        var body = game.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(this);

        //left wall
        bodyDef.position.x = 0;
        bodyDef.position.y = 0;
        fixDef.shape.SetAsBox(0, game.gameHeight / SCALE);
        var body = game.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(this);
    }
    update(){

    }
    draw(){

    }
}
