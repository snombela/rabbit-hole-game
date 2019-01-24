function Background (game){
    this.game = game;
    this.img = new Image();
    this.img.src = "img/grass.png"
}

Background.prototype.draw = function() {
    this.game.ctx.drawImage(this.img, 0, 0, this.game.canvas.width, this.game.canvas.height);
    

}