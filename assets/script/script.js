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

const game = new Phaser.Game(config)
let simpson
let cursors

function preload() {
    this.load.spritesheet('space', './assets/images/space.jpg', {
        frameWidth: 1200, frameHeight: 700
    });
    this.load.image('simpson', './assets/images/simpson.png')
    this.load.image('donut', './assets/images/donut.png',
        { frameWidth: 50, frameHeight: 50 });
}

function create() {
    this.add.image(0, 0, 'space').setOrigin(0, 0);
    this.add.image(300, 300, 'donut');
    simpson = this.physics.add.image(200, 200, 'simpson');
    simpson.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys()
}

function update() {
    if (cursors.up.isDown) {
        simpson.setVelocity(0, -300)
    }
}