function Images (game){
    this.game = game;
    
    this.imgNextLevel = new Image();
    this.imgNextLevel.src = "img/next.png";

    this.imgGameOver = new Image();
    this.imgGameOver.src = "img/gameover.png";

    this.imgBackground = new Image();
    this.imgBackground.src = "img/grass.png"
}

Images.prototype.drawGameOver = function (){
    this.game.ctx.drawImage(this.imgGameOver, 0, 0, this.game.canvas.width, this.game.canvas.height);
}

Images.prototype.drawNextLevel = function (){
    this.game.ctx.drawImage(this.imgNextLevel, 0, 0, this.game.canvas.width, this.game.canvas.height);
}

Images.prototype.drawBackground = function() {
    this.game.ctx.drawImage(this.imgBackground, 0, 0, this.game.canvas.width, this.game.canvas.height);
}