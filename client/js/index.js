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



function Game(canvas, map) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.monsters = [];
  this.player = {};
  this.map = map;
  this.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

}

Game.prototype.init = function(ts,camera) {
  this.current = {
    tileset: this.images[ts]
  }
  this.camera = camera;
  this.canvas.width = this.map.width * this.current.tileset.tile;
  this.canvas.height = this.map.height * this.current.tileset.tile;
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
  this.camera.update(1,1);
}

Game.prototype.render = function(delta) {
  this.ctx.clearRect(0, 0, this.width, this.height);

  for(var y = 0; y < this.map.height; y++) {
    for(var x = 0; x < this.map.width; x++) {
      if(this.getTile(x, y) != -1) {
        ctx.drawImage(this.current.tileset.img, this.getTile(x, y) * 64, 0, 64, 64, x * 64, y * 64, 64, 64);
      }
    }
  }
}

Game.prototype.frame = function() {
  this.now = this.timestamp();
  this.dt = (this.now - this.last) / 1000; // duration in seconds
  this.update(this.dt);
  this.render(this.dt);
  this.last = this.now;
  requestAnimationFrame(this.frame.bind(this));
};


Game.prototype.getTile = function(x, y) {
  return this.map.layer[y * this.map.width + x];
}

function Camera(x, y, width, height, maxX, maxY) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.maxX = maxX;
  this.maxY = maxY;
}

Camera.prototype.update = function(x, y) {
  this.x = x;
  this.y = y;
  this.startCol = Math.floor(this.x / this.tsize);
  this.endCol = this.startCol + (this.width / this.tsize);
  this.startRow = Math.floor(this.y / this.tsize);
  this.endRow = this.startRow + (this.height / this.tsize);
}

var KEYS = {

};

function handleKey(down, e, key) {
  switch(key) {
    case 37:
      KEYS.LEFT = down;
      break;
    case 38:
      KEYS.UP = down;
      break;
    case 39:
      KEYS.RIGHT = down;
      break;
    case 40:
      KEYS.DOWN = down;
      break;
    default:
      KEYS[String.fromCharCode(key)] = down;
      break;
  }
};


document.onkeydown = function(e) {
  handleKey(true, e, e.which);
};

document.onkeyup = function(e) {
  handleKey(false, e, e.which);
};

function getHelp(s) {
  socket.emit('help', s);
}

var map = {
  width: 6,
  height: 6,
  layer: [
    1, 1, 1, 1, 1, 1,
    1, 1, 2, 2, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 2, 1, 2, 2, 2,
    1, 1, 0, 0, 1, 1,
    1, 1, -1, -1, 1, 1,
  ]
};

var game = new Game(canvas, map);
var camera = new Camera(5,10,4,4,6,6);
var loader = new Loader(game);

loader.loadImage('set1', 'img/tiles.png', 64);
loader.ready();

game.init('set1',camera);
game.start();