export default class BadWall {
    constructor(game){
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_staticBody;
        var fixDef = new b2FixtureDef;
        fixDef.shape = new b2PolygonShape;

        //bottom wall
        bodyDef.position.x = game.gameWidth / SCALE;
        bodyDef.position.y = game.gameHeight / SCALE;
        fixDef.shape.SetAsBox(game.gameWidth / SCALE, 0);
        var body = game.world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        body.SetUserData(this);
    }
}
