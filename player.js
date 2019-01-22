//El constructor tiene que recibir todas las cosas que necesita para funcionar.
function Player (game){
    this.game = game; //Hago esto para almacenar y poder llamarlo abajo en las funciones.
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.size = 80;
    this.distance = 8;
    this.speedX = 0; 
    this.speedY = 0;
    this.setListeners();
    this.followObject = [];
    this.movements = [];
    this.framesCounter = 0;
    this.direction = 0;
    this.imgRight = new Image();
    this.imgRight.src = "img/rabbit_right.png";
    this.imgLeft = new Image();
    this.imgLeft.src = "img/rabbit_left.png";
}

Player.prototype.moveUp = function(){
    this.speedY = -6;
}

Player.prototype.moveDown = function(){
    this.speedY = 6;
}

Player.prototype.moveLeft = function() {
    this.direction = 1;
    this.speedX = -6;
}

Player.prototype.moveRight = function() {
    this.direction = 0;
    this.speedX = 6;
} 

Player.prototype.crash = function(object) {
    var positionObject = this.followObject.indexOf(object);
    var count = this.followObject.length - positionObject;
    var newObjects = this.followObject.splice(positionObject, count);
    newObjects.forEach(object => object.reset())
    return newObjects
}

Player.prototype.move = function() {
    if (this.y >= this.size/2 && this.y <= this.game.canvas.height - this.size/2) {
        this.y += this.speedY;
    } else if (this.y < this.size/2){
        this.y = this.size/2;
    } else {
        this.y = this.game.canvas.height - this.size/2;
    }

    if(this.x >= this.size/2 && this.x <= this.game.canvas.width - this.size/2) {
        this.x += this.speedX;
    } else if (this.x < this.size/2){
        this.x = this.size/2;
    } else {
        this.x = this.game.canvas.width - this.size/2;
    }

    if (this.movements.length != 0){
        var lastPosition = this.movements[this.movements.length - 1];
        if(lastPosition.x != this.x || lastPosition.y != this.y){
            this.movements.push({x: this.x, y: this.y}); //Me almaceno el valor de x e y, y lo mando a un array que necesitaré para que los objetos sigan al player.
        } 
    } else {
        this.movements.push({x: this.x, y: this.y}); //Me guardo la primera posición en la que estoy porque si no en las siguientes siempre será 0;
    }

    this.framesCounter++;

    if(this.framesCounter % 300 == 0 && this.movements.length > 200) {
        var size = this.movements.length/2
        this.movements.splice(0, size);
    }
}

Player.prototype.draw = function (){
    var middle = this.size / 2;
    if (this.direction == 0) {
        this.game.ctx.drawImage(this.imgRight, this.x - middle, this.y - middle, this.size, this.size);
    } else {
        this.game.ctx.drawImage(this.imgLeft, this.x - middle, this.y - middle, this.size, this.size);
    }
    
    this.followObject.forEach(function(object, index) {
    
        var lastPosition = this.movements[this.movements.length - (this.distance * (index+1))]; //Accedo a la última posición de mi array pero en vez de poner - 1 ponemos menos 5 por la posición actual para que vayan saliendo uno detrás de otro. No podemos poner 1 porque saldrían muy juntos.

        object.x = lastPosition.x;
        object.y = lastPosition.y;

        object.draw();
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




