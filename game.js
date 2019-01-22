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
        this.objects.forEach(object => object.draw())
        this.collisionObject()
        this.enemy.forEach(function(e){
            e.draw();
            e.move();
        })
        
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

	

