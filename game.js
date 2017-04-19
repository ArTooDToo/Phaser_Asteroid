var w_height, w_width, x1, y1;

w_height = 400;
w_width = 400;
x1 = 25;
y1 = 25;
var bullet;
var bullets;
var graphics;
var bulletTime = 0
var bb, circle

var game = new Phaser.Game(w_height, w_width, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render});

function preload() {
  game.load.image("bb", "bullet.png")
}

function create() {
  graphics = game.add.graphics(w_height/2,w_width/2);

  graphics.beginFill();
  graphics.lineStyle(1, 0xFFFFFF, 1);
  graphics.pivot.x = x1/2;
  graphics.pivot.y = y1/2;
  // draw a shape

  graphics.angle = -90
  graphics.anchor.set(0.5)
  //graphics.lineTo(0,10)
  graphics.lineTo(0,x1); //pionowa kreska
  graphics.lineTo(y1,y1/2);

  //graphics.drawCircle(0, 0, 100);
  graphics.endFill();
  cursors = game.input.keyboard.createCursorKeys();
  game.physics.enable(graphics, Phaser.Physics.ARCADE);

  //graphics.body.setSize(25, 25, 15, -15);

  //graphics.body.collideWorldBounds = true;
  //bb = game.add.graphics(w_height/2,w_width/2);
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(40, "bb");
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.pivot.x = x1/2;
  bullets.pivot.y = y1/2;

}



function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(graphics.body.x + 16, graphics.body.y + 16);
            bullet.lifespan = 500;
            bullet.rotation = graphics.rotation;
            game.physics.arcade.velocityFromRotation(graphics.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

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
      fireBullet();
  }
  screenWrap(graphics)
  bullets.forEachExists(screenWrap, this);

}

function screenWrap(sprite) {
  if(sprite.body.x > w_width){
    sprite.body.x = 0
  }else if(sprite.body.x < 0){
    sprite.body.x = w_width
  }else if(sprite.body.y > w_height){
    sprite.body.y = 0
  }else if(sprite.body.y < 0){
    sprite.body.y = w_height
  }
}

function render() {
    game.debug.spriteInfo(graphics, 32, 32);
    game.debug.body(graphics);
}
