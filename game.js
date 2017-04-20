var w_height, w_width

w_height = 400;
w_width = 400;

var bullet;
var bullets;
var graphics;
var bulletTime = 0
var smt, fireButton

var game = new Phaser.Game(w_height, w_width, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render});

function preload() {
  game.load.image("bb", "bullet.png")
  game.load.image("ship", "ship.png")
  game.load.image("smt", "smt.png")
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //nie działa wraz z generowanym tłem
  //game.renderer.clearBeforeRender = false;
  //game.renderer.roundPixels = true;

  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, "bb");
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);


  graphics = game.add.sprite(200,200, 'ship');
  graphics.anchor.set(0.5)
  graphics.angle = -90
  game.physics.enable(graphics, Phaser.Physics.ARCADE);
  graphics.body.collideWorldBounds = false;

  smt = game.add.sprite(enemySpawnX(),enemySpawnY(), 'smt');
  smt.enableBody = true;
  game.physics.enable(smt, Phaser.Physics.ARCADE);




  cursors = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}



function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(graphics.body.x +25, graphics.body.y + 25);
            bullet.lifespan = 2000;
            bullet.rotation = graphics.rotation;
            game.physics.arcade.velocityFromRotation(graphics.rotation,400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

}


function update() {
  if (cursors.left.isDown ){
        graphics.body.angularVelocity = -300;

  }else if (cursors.right.isDown){
        graphics.body.angularVelocity = 300;
  }else{
    graphics.body.angularVelocity = 0;
  }
  if (cursors.up.isDown){
        game.physics.arcade.accelerationFromRotation(graphics.rotation, 100, graphics.body.acceleration);
  }else{
    graphics.body.acceleration.set(0);
  }
  if(fireButton.isDown){

      fireBullet();
  }
  screenWrap(graphics)
  //bullets.forEachExists(screenWrap, this);
  game.physics.arcade.overlap(bullets, smt, bulletHit, null, this);

}

function bulletHit(_bullet, _smt) {
  _smt.kill()
  _bullet.kill()
  game.state.start(game.state.current)
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

function enemySpawnX() {
  var randomX = game.rnd.integerInRange(0,350)
  return randomX
}
function enemySpawnY() {
  var randomY = game.rnd.integerInRange(0,350)
  return randomY
}

function render() {
    game.debug.spriteInfo(graphics, 32, 32);
    game.debug.body(smt);
    game.debug.body(graphics);

}
