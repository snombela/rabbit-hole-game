window.onload = function() {
  game = new Game("#canvas");
};

function Game(canvasId) {
  this.canvas = document.querySelector(canvasId);
  this.ctx = canvas.getContext("2d");
  this.player = new Player(this);
  this.enemy = [new Enemy(this), new Enemy(this)];
  this.objects = [];
  this.init();

}
Game.prototype.init = function() {
    this.player.draw();
    for (var i = 0; i<10; i++) {
        object = new Object(this);
        object.draw();
        this.objects.push(object)
    }
    
    this.update();
}

Game.prototype.update = function() {
    this.interval = setInterval(function() {
        this.ctx.clearRect(0, 0, 1500, 1700); 
        this.player.draw();
        this.player.move();
        this.objects.forEach(object => object.draw());
        this.collisionObject();
        this.enemy.forEach(function(e){
            e.draw();
            e.move();
        })
        // this.collisionEnemy();
        this.stealObjects();
    }.bind(this), 1000/60);
}

Game.prototype.collisionObject = function() {
    this.objects.forEach(function(object, i) {
        if (Math.sqrt((this.player.x - object.x) * (this.player.x - object.x)+
        (this.player.y - object.y) * (this.player.y - object.y)) < this.player.radius + 
        object.radius) {
            this.player.followObject.push(this.objects.splice(i, 1));
        }
    }.bind(this))
}

Game.prototype.collisionEnemy = function (){
    this.enemy.forEach(function(enemy){
        if (Math.sqrt((this.player.x - enemy.x) * (this.player.x - enemy.x)+
            (this.player.y - enemy.y) * (this.player.y - enemy.y)) < this.player.radius + 
            enemy.radius) {
           this.gameOver();
           alert ("Game Over")
        }
    }.bind(this));
}

Game.prototype.gameOver = function (){
    this.stop();
}

Game.prototype.stop = function (){
     clearInterval(this.interval);
}

Game.prototype.stealObjects = function (){
    this.enemy.forEach(function(enemy){
        if (this.player.followObject.length != 0){
            
            this.player.followObject.forEach(function(object, index) {
                
                var lastPosition = this.player.movements[this.player.movements.length - (5 *(index+1))];
                if (Math.sqrt((enemy.x - lastPosition.x) * (enemy.x - lastPosition.x)+
                (enemy.y - lastPosition.y) * (enemy.y - lastPosition.y)) < enemy.radius + 
                object.radius){
                    console.log('choca')
                } 
            }.bind(this))
            /* this.player.movements.forEach(function(object){
                if (Math.sqrt((enemy.x - object.x) * (enemy.x - object.x)+
                (enemy.y - object.y) * (enemy.y - object.y)) < enemy.radius + 
                object.radius){
                    console.log('choca')
                } 
            })*/
        }
    }.bind(this))
}



/*Enemy tiene que chocar con los objects.
 Nos guardamos la posición en la que ha chocado del array y a partir de ese hacemos un slice y borramos.
 La cantidad de objetos que tiene el array lo tiene que colocar nuevamente en el tablero para que 
 el player lo coja.*/