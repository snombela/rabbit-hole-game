window.onload = function() {
    newGame();
};

function newGame(){
    game = new Game("#canvas");
};

function Game(canvasId) {
  this.canvas = document.querySelector(canvasId);
  this.ctx = canvas.getContext("2d");
  this.player = new Player(this);
  this.enemy = [new Enemy(this), new Enemy(this)];
  this.objects = [];
  this.fps = 60;
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
            if(this.player.movements.length > 1) e.move();
        }.bind(this))
        this.collisionEnemy();
        this.stealObjects();
    }.bind(this), 1000 / this.fps);
}

Game.prototype.collisionObject = function() {
    this.objects.forEach(function(object, i) {
        if (Math.sqrt((this.player.x - object.originalX) * (this.player.x - object.originalX)+
        (this.player.y - object.originalY) * (this.player.y - object.originalY)) < this.player.size/2 + 
        object.size/2) {
            var objectRemove = this.objects.splice(i, 1)[0];
            this.player.followObject.push(objectRemove)
        }
    }.bind(this))
}

Game.prototype.collisionEnemy = function (){
    this.enemy.forEach(function(enemy){
        if (Math.sqrt((this.player.x - enemy.x) * (this.player.x - enemy.x)+
            (this.player.y - enemy.y) * (this.player.y - enemy.y)) < this.player.size/2 + 
            enemy.size/2) {
           this.gameOver();
           alert ("Game Over")
        }
    }.bind(this));
}

Game.prototype.gameOver = function (){
    this.stop();
    newGame();
}

Game.prototype.stop = function (){
     clearInterval(this.interval);
}


Game.prototype.stealObjects = function (){
    if (this.player.followObject.length === 0) { return; }

    this.enemy.forEach(function(enemy){
        this.player.followObject.forEach(function(object, index) {

            var distance = Math.sqrt((enemy.x -  object.x) * (enemy.x - object.x) + (enemy.y - object.y) * (enemy.y - object.y))
            if (distance < enemy.size/2 + object.size/2){
                var newObjectDraw = this.player.crash(object)
                this.objects.push(...newObjectDraw);
            } 

        }.bind(this))
          
        
    }.bind(this))
}

