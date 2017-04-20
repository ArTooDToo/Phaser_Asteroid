var w_height,w_width,bulletTime,bullet,bullets,graphics,smt,fireButton,number,scoreText,score,number2

w_height = 800;
w_width = 600;
bulletTime = 0
score = 0;
number2 = 1

var game = new Phaser.Game(w_height, w_width, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render});

function preload() {
  game.load.image("bb", "bullet.png")
  //game.load.image("ship", "ship.png")
  game.load.image("smt", "smt.png")
  game.load.spritesheet("ship", "ship2.png",50,50)
  game.load.audio("sfx", "Bez_nazwy.mp3")
}
var fx
function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  scoreText = game.add.text(32, 550, 'score: '+score, { font: "20px Arial", fill: "#ffffff", align: "left" });
  //nie działa wraz z generowanym tłem
  //game.renderer.clearBeforeRender = false;
  //game.renderer.roundPixels = true;

  fx = game.add.audio("sfx");
  fx.allowMultiple = true;
  fx.addMarker('strzal', 1, 0.5)
//tworzenie pocisków
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, "bb");
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);

//tworzenie obiektu gracza
  graphics = game.add.sprite(w_height/2,w_width/2, 'ship');
  graphics.anchor.set(0.5)
  //graphics.angle = -90
  game.physics.enable(graphics, Phaser.Physics.ARCADE);
  graphics.body.collideWorldBounds = false;
number = number2
//Generowanie obiektów
  smts = game.add.physicsGroup();
  for (var i = 0; i < number; i++) {
    smt = smts.create(enemySpawnX(),enemySpawnY(), 'smt');
  }
  smts.enableBody = true;
  game.physics.enable(smts, Phaser.Physics.ARCADE);

//przypisanie przycisków
  cursors = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
graphics.animations.add('walk', [0, 1, 0]);
document.querySelector('canvas').style.margin = "auto"
}

function fireBullet () {
    if (game.time.now > bulletTime){
        bullet = bullets.getFirstExists(false);
        if (bullet) {
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
    graphics.animations.play('walk', 10, false);
    game.physics.arcade.accelerationFromRotation(graphics.rotation, 80, graphics.body.acceleration);
  }else if(cursors.down.isDown){
    game.physics.arcade.accelerationFromRotation(graphics.rotation, -80, graphics.body.acceleration);
  }else{
    graphics.body.acceleration.set(0);
  }

  if(fireButton.isDown){
      fx.play('strzal')
      fireBullet();

  }
  screenWrap(graphics)
  //bullets.forEachExists(screenWrap, this);
  game.physics.arcade.overlap(bullets, smts, bulletHit, null, this);
  game.physics.arcade.overlap(graphics, smts, enemyHit, null, this)
}

function enemyHit(_player,_smt) {
  _player.kill()
  game.state.start(game.state.current)
  score = 0
}

function bulletHit(_bullet, _smt) {
  number--
  score += 10
  scoreText.text = 'score: '+ score
  if(number <= 0){
    number2++
    game.state.start(game.state.current)

  }
  _smt.kill()
  _bullet.kill()
}

function screenWrap(sprite) {
  if(sprite.body.x > w_height){
    sprite.body.x = 0
  }else if(sprite.body.x < 0){
    sprite.body.x = w_height
  }else if(sprite.body.y > w_width){
    sprite.body.y = 0
  }else if(sprite.body.y < 0){
    sprite.body.y = w_width
  }
}

function enemySpawnX() {
  var randomX = game.rnd.integerInRange(0,w_height-50)
  return randomX
}
function enemySpawnY() {
  var randomY = game.rnd.integerInRange(0,w_width-50)
  return randomY
}

function render() {
    //game.debug.spriteInfo(graphics, 32, 32);
    //game.debug.body(smt);
    //game.debug.body(graphics);
}
