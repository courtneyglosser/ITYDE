


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
var player;

function preload ()
{
    this.load.image('sky', 'Assets/Images/Sky.png');
    this.load.image('ground', 'Assets/Images/Platform.png');
    this.load.image('player', 'Assets/Images/PC.png');

}

function create ()
{
    this.add.tileSprite(0,0, this.scale.width, this.scale.height,"sky")
        .setOrigin(0, 0)
        .setScrollFactor(0);

    xLimit = this.scale.width * 2;
    yLimit = this.scale.height;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 32x32 in size)
    let scale = this.scale.width * 2 / 32;
    let ground = platforms.create(0, 568, 'ground')
        .setOrigin(0, 0)
        .setScale(scale, 2)
        .refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground').setScale(12.5, 1).refreshBody();
    platforms.create(50, 250, 'ground').setScale(12.5, 1).refreshBody();
    platforms.create(750, 220, 'ground').setScale(12.5, 1).refreshBody();

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'player');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
//    player.setCollideWorldBounds(true);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
//    this.physics.add.collider(stars, platforms);
//    this.physics.add.collider(bombs, platforms);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Setting camera bounds.
    this.cameras.main.setBounds(0, 0, xLimit, yLimit);
}

function update ()
{
    if (cursors.left.isDown && player.x > 16)
    {
        player.setVelocityX(-160);

//        player.anims.play('left', true);
    }
    else if (cursors.right.isDown && player.x < this.scale.width * 2 - 16)
    {
        player.setVelocityX(160);

//        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

//        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-350);
    }


    this.cameras.main.centerOn(player.x, player.y); // follow player
}

