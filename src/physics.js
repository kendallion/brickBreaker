export function setUpDebugDraw(world) {
    
    var b2DebugDraw =
        Box2D.Dynamics.b2DebugDraw;
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(
        document.getElementById("gameScreen").getContext("2d"));
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(
        b2DebugDraw.e_shapeBit |
        b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
}
