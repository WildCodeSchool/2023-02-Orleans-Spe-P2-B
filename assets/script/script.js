const config = {
    width: 1200,
    height: 700,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400}
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
    this.load.image('space', './assets/images/space.png')
    this.load.image('simpson', './assets/images/simpson.png')
}

function create() {
    this.add.image(500, 500, 'space');
    simpson = this.physics.add.image(200, 200, 'simpson');
    simpson.body.collideWorldBounds = true;
    
    cursors = this.input.keyboard.createCursorKeys()
    console.log(cursors)
}

function update() {
    if(cursors.up.isDown) {
        simpson.setVelocity(0, -300)
    }
}