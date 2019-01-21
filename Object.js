function Object(game) {
    this.game = game
    this.x = Math.random() * this.game.canvas.width;
    this.y = Math.random() * this.game.canvas.height;
    this.radius = 10;
}

Object.prototype.draw = function (){
    this.game.ctx.fillStyle='#456424';
    this.game.ctx.beginPath();
    var startAngle = 0; 
    var endAngle = Math.PI*2;
    this.game.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, true);
    this.game.ctx.stroke();
    this.game.ctx.fill(); 
}

