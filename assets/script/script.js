const config = {
    width: 1000,
    height: 500,
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

let game = new Phaser.Game(config)
let simpson
let cursors

function preload() {
    this.load.spritesheet('space', './assets/images/space.png', {
        frameWidth: 1000, frameHeight: 500});
    this.load.image('simpson', './assets/images/simpson.png')
}


function create() {
    let space = this.add.image(400, 400, 'space').setScale(1);
    // this.physics.world.collide.width / 2;
    // this.physics.world.collide.height / 2;
    simpson = this.physics.add.image(400, 400, 'simpson');
    simpson.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys()
    console.log(cursors)
}

function update() {
    if (cursors.up.isDown) {
        simpson.setVelocity(0, -300)
    }
}