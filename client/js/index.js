var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var tiles = new Image();
tiles.src="img/tiles.png";

function update(delta) {
  
}

function render(delta) {
  
}

function frame(timestep) {
  var delta = 0;
  window.timestep = timestep;
  $('body').text(timestep);
  window.requestAnimationFrame(frame);
}