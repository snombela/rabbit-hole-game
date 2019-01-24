function NextLevel (game){
    this.game = game;
}

NextLevel.prototype.draw = function (){
    this.game.ctx.font = 'bold small-caps 100px Curier New';
    this.game.ctx.fillStyle='white';
    this.game.ctx.textAlign = "center"
    this.game.ctx.fillText("NEXT LEVEL", this.game.canvas.width/2, this.game.canvas.height/2);
    

}