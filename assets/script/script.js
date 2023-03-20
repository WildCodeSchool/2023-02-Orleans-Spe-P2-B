const config = {
    width: 1200,
    height: 700,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


let platforms;
let asteroides;
let donuts;
let score = 0;
let life = 3;
let lifeText;

const game = new Phaser.Game(config)
let simpson
let cursors

const musicConfig = {
    mute: false,
    volume: 1,
    detune: 0,
    loop: true,
    delay: 0,
}

const soundConfig = {
    mute: false,
    volume: 3,
    detune: 0,
    loop: false,
    delay: 0,
}

function preload() {
    this.load.spritesheet('space', './assets/images/space.jpg', {
        frameWidth: 1200, frameHeight: 700
    });
    this.load.image('simpson', './assets/images/simpson.png')
    this.load.image('platform1', './assets/images/platform1.png')
    this.load.image('platform2', './assets/images/platform2.png')
    this.load.image('platform3', './assets/images/platform3.png')
    this.load.image('asteroides', './assets/images/asteroid.png')
    this.load.image('donuts', './assets/images/donut.png')
    this.load.audio('wouhou', './assets/sounds/Wouhou.ogg')
    this.load.audio('music', './assets/sounds/music.ogg')
    this.load.audio('gameOver', './assets/sounds/gameOver.ogg')
    this.load.audio('touchAsteroid', './assets/sounds/Asteroid.ogg')
}

function create() {
    this.add.image(0, 0, 'space').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();
    platforms.create(150, 500, 'platform2');
    platforms.create(600, 200, 'platform3');
    platforms.create(1000, 450, 'platform1');

    simpson = this.physics.add.image(200, 200, 'simpson');
    simpson.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys()

    donuts = this.physics.add.group();
    for (let i = 0; i < 8; i++) {
        const x = Phaser.Math.Between(0, game.config.width);
        const y = Phaser.Math.Between(0, 300);
        const donut = donuts.create(x, y, 'donuts');
        donut.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
        donut.body.collideWorldBounds = true;
    }

    asteroides = this.physics.add.group();
    scoreText = this.add.text(16, 16, 'Donut : 0', { font: '32px Simpsonfont', fill: '#f9f931' });
    lifeText = this.add.text(16, 55, 'Vie : 3', { font: '32px Simpsonfont', fill: '#e100ff' });

    this.physics.add.collider(simpson, platforms);
    this.physics.add.collider(donuts, platforms);
    this.physics.add.collider(asteroides, platforms);
    this.physics.add.overlap(simpson, donuts, collectDonuts, null, this);
    this.physics.add.collider(simpson, asteroides, hitAsteroides, null, this);

    this.musicSound = this.sound.add("music");
    this.wouhouSound = this.sound.add("wouhou");
    this.gameOverSound = this.sound.add("gameOver");
    this.touchAsteroidSound = this.sound.add("touchAsteroid");
    this.musicSound.play(musicConfig);
}

function update() {
    if (cursors.left.isDown) {
        simpson.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        simpson.setVelocityX(200);
    } else {
        simpson.setVelocityX(0);
    }
    if (cursors.up.isDown) {
        simpson.setVelocityY(-300)
    }
    if (cursors.down.isDown) {
        simpson.setVelocityY(300)
    }
}

function hitAsteroides(simpson) {
    this.touchAsteroidSound.play(soundConfig);
    simpson.y = -0
    life -= 1
    lifeText.setText('Vie : ' + life);
    if (life === 0) {
        gameOver = this.add.text(450, 300, 'Game Over !!!', { font: '52px Simpsonfont', fill: '#e81e50' })
        const button = this.add.text(500, 400, 'Recommencer', { font: '32px Simpsonfont', fill: '#f9f931' }).setInteractive();
        button.on('pointerup', openExternalLink, this);
        simpson.disableBody(true, true)
        this.gameOverSound.play(soundConfig);
    }
}

function collectDonuts(simpson, donut) {
    donut.disableBody(true, true);
    this.wouhouSound.play(soundConfig);
    score += 1;
    scoreText.setText('Donuts : ' + score);

    if (donuts.countActive() === 0) {
        for (let i = 0; i < 8; i++) {
            const x = Phaser.Math.Between(0, game.config.width);
            const y = Phaser.Math.Between(0, 300);
            const donut = donuts.create(x, y, 'donuts');
            donut.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
            donut.body.collideWorldBounds = true;
        }
        let x = (simpson.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const asteroide = asteroides.create(x, 16, 'asteroides');
        asteroide.setBounce(1);
        asteroide.setCollideWorldBounds(true);
        asteroide.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

function openExternalLink() {
    const s =  this.scene.restart();
    if (s) {
        s.focus();
    }
}