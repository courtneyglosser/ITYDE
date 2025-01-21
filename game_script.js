


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var platforms;

function preload ()
{
    this.load.image('sky', 'Assets/Images/Sky.png');
    this.load.image('ground', 'Assets/Images/Platform.png');

}

function create ()
{
    this.add.tileSprite(0,0, this.scale.width, this.scale.height,"sky")
        .setOrigin(0, 0)
        .setScrollFactor(0);


    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 32x32 in size)
    let scale = this.scale.width / 32;
    let ground = platforms.create(0, 568, 'ground')
        .setOrigin(0, 0)
        .setScale(scale, 2)
        .refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    //  Collide the player and the stars with the platforms
//    this.physics.add.collider(player, platforms);
//    this.physics.add.collider(stars, platforms);
//    this.physics.add.collider(bombs, platforms);

}

function update ()
{
}

