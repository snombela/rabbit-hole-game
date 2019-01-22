function Object(game) {
    this.game = game
    this.originalX = Math.random() * this.game.canvas.width;
    this.originalY = Math.random() * this.game.canvas.height;
    this.x = this.originalX;
    this.y = this.originalY;
    this.radius = 10;
}

Object.prototype.draw = function (){
    this.game.ctx.fillStyle='orange';
    this.game.ctx.beginPath();
    var startAngle = 0; 
    var endAngle = Math.PI*2;
    this.game.ctx.arc(this.originalX, this.originalY, this.radius, startAngle, endAngle, true);
    this.game.ctx.stroke();
    this.game.ctx.fill(); 
}

