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
  this.hole = new Hole(this);
  this.enemy = [];
  this.numberEnemies = 2;
  this.objects = [];
  this.fps = 60;
  this.initObject = 1;
  this.init();
}

Game.prototype.generateEnemy = function (){
    while (this.enemy.length < this.numberEnemies){
            var enemy = new Enemy(this);
            if (this.checkCollisionEnemy(enemy)!== true){
            this.enemy.push(enemy)
            }
    }
}
Game.prototype.generateObjects = function(){
    while (this.objects.length < this.initObject){
        var object = new Object(this);
        if (this.checkCollisionObject(object)!== true){
        object.draw();
        this.objects.push(object)
        }
    }
}
Game.prototype.init = function() {
    this.player.draw();
    this.generateObjects();
    this.generateEnemy();
    this.update();
}

Game.prototype.update = function() {
    this.interval = setInterval(function() {
        this.ctx.clearRect(0, 0, 1500, 1700); 
        if (this.player.followObject.length === this.initObject){
            this.hole.draw();
        }
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
        this.passLevel();
        
        
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
           alert("Game Over")
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

Game.prototype.passLevel = function (){
   
        if (Math.sqrt((this.player.x - this.hole.x) * (this.player.x - this.hole.x)+
            (this.player.y - this.hole.y) * (this.player.y - this.hole.y)) < this.player.size/2 + 
            this.hole.size/2) {
           console.log("Win")
           this.stop();
           this.levelUp()
        }
}

Game.prototype.checkCollisionObject = function (object){
        return (Math.sqrt((this.player.x - object.originalX) * (this.player.x - object.originalX)+
        (this.player.y - object.originalY) * (this.player.y - object.originalY)) < this.player.size/2 + 
        object.size/2) 
}

Game.prototype.checkCollisionEnemy = function (enemy){
    return (Math.sqrt((this.player.x - enemy.x) * (this.player.x - enemy.x)+
    (this.player.y - enemy.y) * (this.player.y - enemy.y)) < this.player.size/2 + 
    enemy.size/2) 
}

Game.prototype.levelUp = function(){
    this.initObject += 5;
    this.numberEnemies += 1;
    this.enemy.speedY = Math.random() * 6; //Poner más que en el anterior.
    this.enemy.speedX = Math.random() * 6; //Poner más que en el anterior.
}
