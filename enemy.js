function Enemy (game){
    this.game = game;
    this.x = Math.random() * this.game.canvas.width;
    this.y = Math.random() * this.game.canvas.height;
    this.radius = 20;
    this.speedY = Math.random()* 6;
    this.speedX = Math.random()* 6;
}

Enemy.prototype.draw = function (){
    this.game.ctx.fillStyle='#8B0000';
    this.game.ctx.beginPath();
    var startAngle = 0; 
    var endAngle = Math.PI*2;
    this.game.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, true);
    this.game.ctx.stroke();
    this.game.ctx.fill(); 
}

Enemy.prototype.move = function (){
    if (this.y >= this.radius && this.y <= this.game.canvas.height - this.radius){
        this.y += this.speedY;
    } else if (this.y < this.radius){
        this.y = this.radius;
        this.speedY *= -1;
    } else {
        this.y = this.game.canvas.height - this.radius;
        this.speedY *= -1;
    }

    if(this.x >= this.radius && this.x <= this.game.canvas.width - this.radius) {
        this.x += this.speedX;
    } else if (this.x < this.radius){
        this.x = this.radius;
        this.speedX *= -1;
    } else {
        this.x = this.game.canvas.width - this.radius;
        this.speedX *= -1;
    }
}

