function Obstacle(game) {
    this.game = game
    this.x = Math.random() * this.game.canvas.width;
    this.y = Math.random() * this.game.canvas.height;

}

Obstacle.prototype.draw = function (){
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle='brown';
    this.game.ctx.fillRect(this.x, this.y,50,100);
    this.game.ctx.fill(); 
    this.game.ctxt.strokeStyle='black';
    this.game.ctx.strokeRect(this.x, this.y, 50, 100);
    this.game.ctx.lineWidth = 2;
    this.game.ctx.stroke();
 
}
