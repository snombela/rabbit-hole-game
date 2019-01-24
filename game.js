window.onload = function() {
    game = new Game("#canvas");
};

function Game(canvasId) {
  this.canvas = document.querySelector(canvasId);
  this.ctx = canvas.getContext("2d");

  this.background = new Background(this);
  this.player = new Player(this);
  this.hole = new Hole(this);
  this.text = new Text(this);
  this.gameOverText = new GameOverText(this);
  this.nextLevel = new NextLevel(this);

  this.carrot = new Audio("sounds/chewingcarrot.mp3")
  this.shout = new Audio("sounds/shout.mp3")
  this.magic = new Audio("sounds/hole.wav")
  this.fox = new Audio("sounds/crazyLaught.mp3")
//   this.carrot.volume?

  this.enemy = [];
  this.objects = [];

  this.initObject = 2;
  this.numberEnemies = 1;
  this.level = 1;
  
  this.fps = 60;
  this.init();
}

Game.prototype.init = function() {
    this.background.draw();
    this.player.draw();
    this.generateObjects();
    this.generateEnemy();
    this.update();
}

Game.prototype.stop = function (){
    clearInterval(this.interval);
}

Game.prototype.reset = function() {
    this.player = new Player(this);
    this.hole = new Hole(this);
  
    this.enemy = [];
    this.objects = [];
}

Game.prototype.levelUp = function() {
    this.magic.play();
    this.stop();
    this.nextLevel.draw();
    this.reset();
    this.initObject += 2;
    this.numberEnemies += 1;
    this.level++;

    setTimeout (function(){  
        this.init();
    }.bind(this), 2000)
}

Game.prototype.gameOver = function() {
    this.stop();
    this.gameOverText.draw();
    
    this.reset();
    this.initObject = 2;
    this.numberEnemies = 1;
    this.level = 1;

    setTimeout (function(){  
        this.init();
    }.bind(this), 3000)
} 

Game.prototype.generateEnemy = function () {
    while (this.enemy.length < this.numberEnemies) {
        var enemy = new Enemy(this);
        if (this.checkCollisionEnemy(enemy) !== true){
            this.enemy.push(enemy)
        }
    }
}

Game.prototype.generateObjects = function() {
    while (this.objects.length < this.initObject) {
        var object = new Object(this);
        if (this.checkCollisionObject(object) !== true){
            object.draw();
            this.objects.push(object)
        }
    }
}

Game.prototype.update = function() {
    this.interval = setInterval(function() {
        this.ctx.clearRect(0, 0, 1400, 700); 
        this.background.draw();
        
    
        if (this.player.followObject.length === this.initObject){
            this.hole.draw();
        }
        this.objects.forEach(object => object.draw());
        this.enemy.forEach(function(e){
            e.draw();
            if(this.player.movements.length > 1) e.move();
        }.bind(this))
        this.player.draw();
        this.player.move();
        this.text.draw();

        this.collisionObject();
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
            this.carrot.play();
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
           this.shout.play();
        
        }
    }.bind(this));
}

Game.prototype.stealObjects = function (){
    if (this.player.followObject.length === 0) { return; }

    this.enemy.forEach(function(enemy){
        this.player.followObject.forEach(function(object, index) {
            var distance = Math.sqrt((enemy.x -  object.x) * (enemy.x - object.x) + (enemy.y - object.y) * (enemy.y - object.y))
            if (distance < enemy.size/2 + object.size/2){
                this.fox.play()
                var newObjectDraw = this.player.crash(object)
                this.objects.push(...newObjectDraw);
            } 
        }.bind(this))
    }.bind(this))
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

Game.prototype.passLevel = function (){
    if (this.player.followObject.length === this.initObject) {
 
         distance = Math.sqrt((this.player.x - this.hole.x - this.hole.width/2) * (this.player.x - this.hole.x - this.hole.width/2)+
         (this.player.y - this.hole.y - this.hole.height/2) * (this.player.y - this.hole.y - this.hole.height/2))
         
         if (distance < 40) { // pongo 40 porque es la distancia optima para que el conejo entre en la madriguera
            this.levelUp()
            
         }
     }
 }

 