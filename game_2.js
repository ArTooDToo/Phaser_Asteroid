var w_height, w_width;
w_height = 400;
w_width = 400;
var game = new Phaser.Game(w_height, w_width, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

}
var graphics
var poly

function create() {
  game.physics.startSystem(Phaser.Physics.P2JS);

  poly = new Phaser.Polygon();
  poly.setTo([ new Phaser.Point(0, 0), new Phaser.Point(-15, 60), new Phaser.Point(15, 60)]);
  graphics = game.add.graphics(200, 200);
  graphics.beginFill(0xffffff);
  graphics.drawPolygon(poly.points);
  graphics.endFill();
  graphics.pivot.x = 0;
  graphics.pivot.y = 30;
  graphics.anchor.setTo(0, 0);
  //game.physics.p2.enable(graphics);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown ){
    graphics.body.rotateLeft(100)
  }else if (cursors.right.isDown){
    graphics.body.rotateRight(100)
  }else{
    graphics.body.setZeroRotation()
  }


  if(cursors.up.isDown){
    graphics.body.thrust(400)
  }else if(cursors.down.isDown){
    graphics.body.reverse(10)
  }
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){

  }
  screenWrap(graphics)
  game.debug.spriteInfo(graphics, 32, 32);
}

function screenWrap(sprite) {
  if(sprite.body.x > w_width){
    sprite.body.x = 0
  }
}
