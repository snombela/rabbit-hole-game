function Text (game){
    this.game = game;
}

Text.prototype.draw = function (){
    this.game.ctx.font = '30px Roboto';
    this.game.ctx.fillStyle='white';
    this.game.ctx.fillText('Round: ' + this.game.level, 16, 35);
  
}