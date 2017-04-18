var w_height, w_width, x1, y1;

w_height = 400;
w_width = 400;
x1 = 25;
y1 = 25;
var game = new Phaser.Game(w_height, w_width, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

}
var graphics
function create() {
  graphics = game.add.graphics(w_height/2,w_width/2);
  graphics.beginFill();
  graphics.lineStyle(1, 0xFFFFFF, 1);
  graphics.pivot.x = x1/2;
  graphics.pivot.y = y1/2;
// draw a shape
  //graphics.moveTo(50,50);
  graphics.anchor.set(0.5)
  graphics.lineTo(0,x1); //pionowa kreska
  graphics.lineTo(y1,y1/2);

  graphics.endFill();

  cursors = game.input.keyboard.createCursorKeys();
  game.physics.enable(graphics, Phaser.Physics.ARCADE);
  graphics.body.collideWorldBounds = true;
}
function update() {
  if (cursors.left.isDown ){
        graphics.angle -= 3
  }
  if (cursors.right.isDown){
        graphics.angle += 3
  }
  if (cursors.up.isDown){
        game.physics.arcade.accelerationFromRotation(graphics.rotation, 100, graphics.body.acceleration);
  }else{
    graphics.body.acceleration.set(0);
  }
  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){

  }

  game.debug.spriteInfo(graphics, 32, 32);
}
