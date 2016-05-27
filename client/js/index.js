var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var tiles = new Image();
tiles.src="img/tiles.png";
var socket = io();

function update(delta) {
  
}

function render(delta) {
  
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

var now, dt,
    last = timestamp();

function frame() {
  now   = timestamp();
  dt    = (now - last) / 1000;    // duration in seconds
  update(dt);
  render(dt);
  last = now;
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);