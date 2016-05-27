var image = new Image();
image.src = 'img/tiles.png';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var map = {
  cols: 4,
  rows: 4,
  tsize: 64,
  layers: [
    [
      1, 1, 1, 1,
      1, 2, 2, 1,
      2, 1, 3, 2,
      1, 1, 1, 1
    ],
    [
      0, 0, 0, 0,
      0, 0, 4, 0, 0, 0, 0, 0, 0, 5,0,0
    ]
  ],
  getTile: function(layer, col, row) {
    return this.layers[layer][row * map.cols + col];
  }
}

canvas.width = map.cols * map.tsize;
canvas.height = map.rows * map.tsize;

for(var layer = 0; layer < map.layers.length; layer++) {
  for(var c = 0; c < map.cols; c++) {
    for(var r = 0; r < map.rows; r++) {
      var tile = map.getTile(layer, c, r);
      if(tile !== 0) { // 0 => empty tile
        ctx.drawImage(
          image, // image
          (tile - 1) * map.tsize, // source x
          0, // source y
          map.tsize, // source width
          map.tsize, // source height
          c * map.tsize, // target x
          r * map.tsize, // target y
          map.tsize, // target width
          map.tsize // target height
        );
      }
    }
  }
}