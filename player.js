//El constructor tiene que recibir todas las cosas que necesita para funcionar.
function Player (game){
    this.game = game; //Hago esto para almacenar y poder llamarlo abajo en las funciones.
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.radius = 20;
    this.speedX = 0; 
    this.speedY = 0;
    this.setListeners();
}

Player.prototype.move = function() {
    if (this.y >= this.radius && this.y <= this.game.canvas.height - this.radius){
        this.y += this.speedY;
    } else if (this.y < this.radius){
        this.y = this.radius;
    } else {
        this.y = this.game.canvas.height - this.radius;
    }

    if(this.x >= this.radius && this.x <= this.game.canvas.width - this.radius) {
        this.x += this.speedX;
    } else if (this.x < this.radius){
        this.x = this.radius;
    } else {
        this.x = this.game.canvas.width - this.radius;
    }
}

Player.prototype.moveUp = function(){
        this.speedY -= 0.3;
}

Player.prototype.moveDown = function(){
        this.speedY += 0.3;
}

Player.prototype.moveLeft = function(){
        this.speedX -= 0.3;
}

Player.prototype.moveRight = function(){
        this.speedX += 0.3;
} 

Player.prototype.draw = function (){
    this.game.ctx.fillStyle='red';
    this.game.ctx.beginPath();
    var startAngle = 0; 
    var endAngle = Math.PI*2;
    this.game.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, true);
    this.game.ctx.stroke();
    this.game.ctx.fill(); 
}

Player.prototype.setListeners = function (){
    document.onkeydown = function(e) {
        switch (e.keyCode) {
          case 38: this.moveUp(); break;
          case 40: this.moveDown(); break;
          case 37: this.moveLeft(); break;
          case 39: this.moveRight(); break;
        } 
    }.bind(this);  
    
    document.onkeyup = function (e){
        switch (e.keyCode) {
            case 38: this.speedY = 0; break;
            case 40: this.speedY = 0; break;
            case 37: this.speedX = 0; break;
            case 39: this.speedX = 0; break;
        }
    }.bind(this);
}


