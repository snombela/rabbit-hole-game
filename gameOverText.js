function GameOverText (game){
    this.game = game;
}

GameOverText.prototype.draw = function (){
    this.game.ctx.font = 'bold small-caps 100px Curier New';
    this.game.ctx.fillStyle='white';
    this.game.ctx.textAlign = "center"
    this.game.ctx.fillText("GAME OVER", this.game.canvas.width/2, this.game.canvas.height/2);

}