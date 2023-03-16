const config = {
    width: 1200,
    height: 700,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400, x: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}


let platforms;
let donut;
let score = 0;

const game = new Phaser.Game(config)
let simpson
let cursors

function preload() {
    this.load.spritesheet('space', './assets/images/space.jpg', {
        frameWidth: 1200, frameHeight: 700
    });
    this.load.image('simpson', './assets/images/simpson.png')
    this.load.image('platform1', './assets/images/platform1.png')
    this.load.image('platform2', './assets/images/platform2.png')
    this.load.image('platform3', './assets/images/platform3.png')
    this.load.image('donut', './assets/images/donut.png')
}

function create() {
    this.add.image(0, 0, 'space').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();
    platforms.create(150, 500, 'platform2');
    platforms.create(600, 200, 'platform3');
    platforms.create(1000, 400, 'platform1');

    simpson = this.physics.add.image(200, 200, 'simpson');
    simpson.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys()

    donut = this.physics.add.group({
        key: 'donut',
        repeat: 8,
        setXY: { x: 200, y: 0, stepX: 100 }
    });

    donut.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    });

    scoreText = this.add.text(16, 16, 'Donut : 0', { font: '32px Simpsonfont', fill: '#f9f931' });

    this.physics.add.collider(simpson, platforms);
    this.physics.add.collider(donut, platforms);

    this.physics.add.overlap(simpson, donut, collectDonut, null, this);
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

function collectDonut(simpson, donut) {
    donut.disableBody(true, true);
    score += 1;
    scoreText.setText('Donuts : ' + score);
}