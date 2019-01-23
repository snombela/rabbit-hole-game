function Hole (game){
    this.game = game;
    this.img = new Image();
    this.img.src = "img/Hole.png"
    this.x = 50;
    this.y = 50;
    this.width = 200;
    this.height = 100;
    this.size = 140;
}

Hole.prototype.draw = function (){
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}





//Después cuando el conejo pise la madriguera el juego termina y pasas de nivel.