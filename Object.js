function Object(game) {
    this.game = game
    this.originalX = Math.random() * this.game.canvas.width;
    this.originalY = Math.random() * this.game.canvas.height;
    this.x = this.originalX;
    this.y = this.originalY;
    this.radius = 40;
    this.img = new Image();
    this.img.src = "img/carrot.png";
}

Object.prototype.reset = function () {
    this.x = this.originalX;
    this.y = this.originalY;
}

Object.prototype.draw = function () {
    var middle = this.radius / 2;
    this.game.ctx.drawImage(this.img, this.x - middle, this.y - middle, this.radius, this.radius);
}
