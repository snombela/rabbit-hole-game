function Object(game) {
    this.game = game
    this.originalX = Math.random() * (this.game.canvas.width - 40) + 20;
    this.originalY = Math.random() * (this.game.canvas.height - 40) + 20;
    this.x = this.originalX;
    this.y = this.originalY;
    this.size = 40;
    this.img = new Image();
    this.img.src = "img/carrot.png";
}

Object.prototype.reset = function () {
    this.x = this.originalX;
    this.y = this.originalY;
}

Object.prototype.draw = function () {
    var middle = this.size / 2;
    this.game.ctx.drawImage(this.img, this.x - middle, this.y - middle, this.size, this.size);
}
