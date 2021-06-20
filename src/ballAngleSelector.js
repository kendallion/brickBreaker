import { toRadians } from './mathHandler.js';

export default class BallAngleSelector {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.length = 100;
        this.angle = 90;
    }

    update() {

    }

    draw(ctx) {
        ctx.beginPath();
        this.canvas_arrow(ctx, this.game.ball.body.GetPosition().x * SCALE, this.game.ball.body.GetPosition().y * SCALE,
            this.gameWidth / 2, .9 * this.gameHeight - 100);
        ctx.stroke();
    }

    canvas_arrow(context, fromx, fromy) {
      var headlen = 10; // length of head in pixels
      var tox, toy;
      if(this.angle > 90) {
           tox = this.game.ball.body.GetPosition().x * SCALE + this.length * Math.cos(toRadians(180 - this.angle));
           toy = this.game.ball.body.GetPosition().y * SCALE - this.length * Math.sin(toRadians(180 - this.angle));
      }
      else if(this.angle < 90) {
          tox = this.game.ball.body.GetPosition().x * SCALE - this.length * Math.cos(toRadians(this.angle));
          toy = this.game.ball.body.GetPosition().y * SCALE - this.length * Math.sin(toRadians(this.angle));
      }
      else {
          tox = this.game.ball.body.GetPosition().x * SCALE;
          toy = this.game.ball.body.GetPosition().y * SCALE - this.length;
      }
      var dx = tox - fromx;
      var dy = toy - fromy;
      var headAngle = Math.atan2(dy, dx);
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.lineTo(tox - headlen * Math.cos(headAngle - Math.PI / 6), toy - headlen * Math.sin(headAngle - Math.PI / 6));
      context.moveTo(tox, toy);
      context.lineTo(tox - headlen * Math.cos(headAngle + Math.PI / 6), toy - headlen * Math.sin(headAngle + Math.PI / 6));
    }

    angleLeft() {
        if(this.angle > 15) this.angle -= 15;
    }

    angleRight() {
        if(this.angle < 165) this.angle += 15;
    }
}
