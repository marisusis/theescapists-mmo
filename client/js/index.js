var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var tiles = new Image();
tiles.src = "img/tiles.png";
var socket = io();

function Loader(game) {
  this.game = game;
  this.images = {}
}

Loader.prototype.loadImage = function(id, url, tile) {
  var image = new Image();
  image.src = url;
  this.images[id] = {
    img: image,
    url: url,
    tile: tile
  }
}

Loader.prototype.ready = function() {
  this.game.loadImages(this.images);
}



function Game(ctx, map) {
  this.ctx = ctx;
  this.monsters = [];
  this.player = {};
  this.map = map;
  this.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }
}

Game.prototype.init = function(ts) {
  this.current = {
    tileset: this.images[ts]
  }
}

Game.prototype.loadImages = function(images) {
  this.images = images;
}

Game.prototype.start = function() {
  this.width = this.current.tileset.tile * this.map.width;
  this.height = this.current.tileset.tile * this.map.width;
  this.now = 0;
  this.dt = 0;
  this.last = this.timestamp();
  this.frame();
}

Game.prototype.update = function(delta) {

}

Game.prototype.render = function(delta) {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

Game.prototype.frame = function() {
  this.now = this.timestamp();
  this.dt = (this.now - this.last) / 1000; // duration in seconds
  this.update(this.dt);
  this.render(this.dt);
  this.last = this.now;
  requestAnimationFrame(this.frame.bind(this));
};

var map = {
  width: 8,
  height: 8,
  layer: [
    1, 1, 1, 1, 1, 1,
    1, 1, 2, 2, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 2, 1, 2, 2, 2,
    1, 1, 0, 0, 1, 1,
    1, 1, 0, 0, 1, 1,
  ]
};

var game = new Game(ctx, map);
var loader = new Loader(game);

loader.loadImage('set1', 'img/tiles.png', 64);
loader.ready();

game.init('set1');
game.x = 1;
game.y = 2;
game.start();