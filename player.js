//El constructor tiene que recibir todas las cosas que necesita para funcionar.
function Player (game){
    this.game = game; //Hago esto para almacenar y poder llamarlo abajo en las funciones.
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.radius = 20;
    this.speedX = 0; 
    this.speedY = 0;
    this.setListeners();
    this.followObject = [];
    this.movements = [];

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

    if (this.movements.length != 0){
        var lastPosition = this.movements[this.movements.length-1];
        if(lastPosition.x != this.x || lastPosition.y != this.y){
            this.movements.push({x: this.x, y: this.y}); //Me almaceno el valor de x e y, y lo mando a un array que necesitaré para que los objetos sigan al player.
        } 
    } else {
        this.movements.push({x: this.x, y: this.y}); //Me guardo la primera posición en la que estoy porque si no en las siguientes siempre será 0;
    }
}

Player.prototype.moveUp = function(){
        this.speedY = -6;
}

Player.prototype.moveDown = function(){
        this.speedY = 6;
}

Player.prototype.moveLeft = function(){
        this.speedX = -6;
}

Player.prototype.moveRight = function(){
        this.speedX = 6;
} 

Player.prototype.draw = function (){
    this.game.ctx.fillStyle='white';
    this.game.ctx.beginPath();
    var startAngle = 0; 
    var endAngle = Math.PI*2;
    this.game.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, true);
    this.game.ctx.stroke();
    this.game.ctx.fill(); 

    this.followObject.forEach(function(object, index) {
        
        var lastPosition = this.movements[this.movements.length - (5 *(index+1))]; //Accedo a la última posición de mi array pero en vez de poner - 1 ponemos menos 5 por la posición actual para que vayan saliendo uno detrás de otro. No podemos poner 1 porque saldrían muy juntos.
        this.game.ctx.fillStyle='orange';
        this.game.ctx.beginPath();
        var startAngle = 0; 
        var endAngle = Math.PI * 2;
        this.game.ctx.arc(lastPosition.x, lastPosition.y, 10, startAngle, endAngle, true);
        this.game.ctx.stroke();
        this.game.ctx.fill(); 
    }.bind(this));
    
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




