function NextLevel (game){
    this.game = game;
}

NextLevel.prototype.draw = function (){
    this.game.ctx.font = 'bold small-caps 100px Curier New';
    this.game.ctx.fillStyle='white';
    this.game.ctx.fillText("NEXT LEVEL", 350, this.game.canvas.height/2);

}