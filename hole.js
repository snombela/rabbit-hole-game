function Hole (game){
    this.game = game;
    this.img = new Image();
    this.img.src = "img/hole.png"

    this.width = 200;
    this.height = 120;

    this.x = Math.random() * (this.game.canvas.width - this.width);
    this.y = Math.random() * (this.game.canvas.height - this.height);
}

Hole.prototype.draw = function (){
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}





//Después cuando el conejo pise la madriguera el juego termina y pasas de nivel.