function Text (game){
    this.game = game;
}

Text.prototype.draw = function (){
    this.game.ctx.font = '540 small-caps 35px Courier New';
    this.game.ctx.fillStyle='coral';
    this.game.ctx.fillText('Round: ' + this.game.level, 16, 35);
  
}