function Text (game){
    this.game = game;
}

Text.prototype.draw = function (){
    this.game.ctx.font = '540 small-caps 35px ja';
    this.game.ctx.fillStyle='white';
    this.game.ctx.textAlign = "left";
    this.game.ctx.fillText('Round ' + this.game.level, 16, 35);
  
}