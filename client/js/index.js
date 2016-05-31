var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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

function Game(canvas, map,camera) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.monsters = [];
  this.player = {};
  this.map = map;
  this.timestamp = function() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }
  this.camera = camera||{
    x: 0,
    y: 0,
    width: 256,
    height: 256
  }

}

Game.prototype.init = function(ts) {
  this.current = {
    tileset: this.images[ts]
  }
  this.width = this.map.cols * this.map.tsize;
  this.height = this.map.rows * this.map.tsize;
  this.canvas.height = this.camera.width;
  this.canvas.width = this.camera.height;
  this.camera.maxX = this.map.cols * this.map.tsize - this.camera.width;
  this.camera.maxY = this.map.rows * this.map.tsize - this.camera.height;
}

Game.prototype.loadImages = function(images) {
  this.images = images;
}

Game.prototype.start = function() {

  this.now = 0;
  this.dt = 0;
  this.last = this.timestamp();
  this.frame();
}

Game.prototype.update = function(delta) {
  var dirx = 0;
    var diry = 0;
    if (KEYS.LEFT) { dirx = -1; }
    if (KEYS.RIGHT) { dirx = 1; }
    if (KEYS.UP) { diry = -1; }
    if (KEYS.DOWN) { diry = 1; }

    this.camera.move(delta, dirx, diry);
}

Game.prototype.render = function(delta) {
  this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  var startCol = Math.floor(this.camera.x / this.map.tsize);
  var endCol = startCol + (this.camera.width / this.map.tsize);
  var startRow = Math.floor(this.camera.y / this.map.tsize);
  var endRow = startRow + (this.camera.height / this.map.tsize);
  var offsetX = -this.camera.x + startCol * this.map.tsize;
  var offsetY = -this.camera.y + startRow * this.map.tsize;
  for(var c = startCol; c <= endCol; c++) {
    for(var r = startRow; r <= endRow; r++) {
      var tile = this.getTile(c, r);
      var x = (c - startCol) * this.map.tsize + offsetX;
      var y = (r - startRow) * this.map.tsize + offsetY;
      if(tile !== 0) {
        ctx.drawImage(
          this.current.tileset.img, //image
          (tile - 1) * this.map.tsize,
          0,
          this.map.tsize,
          this.map.tsize,
          Math.round(x),
          Math.round(y),
          this.map.tsize,
          this.map.tsize
        )
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
  return this.map.layer[y * this.map.cols + x];
}


function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
}

Camera.SPEED = 256; // pixels per second

Camera.prototype.move = function (delta, dirx, diry) {
    // move camera
    this.x += dirx * Camera.SPEED * delta;
    this.y += diry * Camera.SPEED * delta;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
};

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
  cols: 12,
  rows: 12,
  tsize: 64,
  layer: [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
  ]
};
var camera = new Camera(map,8*64,6*64);
var game = new Game(canvas, map,camera);

var loader = new Loader(game);

loader.loadImage('set1', 'img/tiles.png', 64);
loader.ready();

game.init('set1');
game.start();