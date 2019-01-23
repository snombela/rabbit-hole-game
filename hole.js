function Hole (game){
    this.game = game;
    this.img = new Image();
    this.img.src = "img/Hole.png"
    this.x = 1300;
    this.y = 600;
}

Hole.prototype.draw = function (){
    this.game.ctx.drawImage(this.img, this.x, this.y);
}




/* Cuando el conejo tenga todas las zanahorias de la pantalla aparece la madriguera para que puedas pasar
de nivel si no vuelve a desaparecer. followObjects === objects? */