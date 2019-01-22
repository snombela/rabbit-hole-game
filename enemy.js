function Enemy (game){
    this.game = game;
    this.x = Math.random() * this.game.canvas.width;
    this.y = Math.random() * this.game.canvas.height;
    this.size = 60;
    this.speedY = Math.random() * 6;
    this.speedX = Math.random() * 6;
    this.img = new Image();
    this.img.src = "img/fox.png";
}

Enemy.prototype.draw = function () {
    var middle = this.size / 2;
    this.game.ctx.drawImage(this.img, this.x - middle, this.y - middle, this.size, this.size);
}

Enemy.prototype.move = function (){
    if (this.y >= this.size/2 && this.y <= this.game.canvas.height - this.size/2){
        this.y += this.speedY;
    } else if (this.y < this.size/2){
        this.y = this.size/2;
        this.speedY *= -1;
    } else {
        this.y = this.game.canvas.height - this.size/2;
        this.speedY *= -1;
    }

    if(this.x >= this.size/2 && this.x <= this.game.canvas.width - this.size/2) {
        this.x += this.speedX;
    } else if (this.x < this.size/2){
        this.x = this.size/2;
        this.speedX *= -1;
    } else {
        this.x = this.game.canvas.width - this.size/2;
        this.speedX *= -1;
    }
}

