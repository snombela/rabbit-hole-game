window.onload = function() {
  game = new Game("#canvas");
};

function Game(canvasId) {
  this.canvas = document.querySelector(canvasId);
  this.ctx = canvas.getContext("2d");
  this.player = new Player(this);
  this.objects = [];
  this.init();

}
    Game.prototype.init = function() {
        this.player.draw();
        for (var i = 0; i<5; i++) {
            object = new Object(this);
            object.draw();
            this.objects.push(object)
        }
        this.update();
    }

    Game.prototype.update = function() {
        this.interval = setInterval(function(){
            this.ctx.clearRect(0, 0, 1500, 1700); 
            this.player.draw();
            this.player.move();
            this.objects.forEach(object => object.draw())
            this.collisionObject()
            
        }.bind(this), 1000/60);
    }

    Game.prototype.collisionObject = function(){
        this.objects.forEach(function(object, i){
        if (Math.sqrt((this.player.x - object.x)*(this.player.x - object.x)+
       (this.player.y - object.y)*(this.player.y - object.y)) < this.player.radius + 
       object.radius){
           this.player.followObstacles.push(this.objects.splice(i, 1));
       }
        }.bind(this))
   
       }


    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    // if ( Math.sqrt( ( x2-x1 ) * ( x2-x1 )  + ( y2-y1 ) * ( y2-y1 ) ) < ( radius1 + radius2 ) )

	

    // Crear una función que compruebe si hay colisión. Si es así devuelve true y 
    // elimina el objeto del array con slice.Además, hay que añadir esto a update para que lo compruebe todo el tiempo.
    // hacer push en this.objects... y dentro pongo eso.