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
        }.bind(this), 1000/60);
    }