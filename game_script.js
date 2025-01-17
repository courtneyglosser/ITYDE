

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
    console.log("Create function");
}

function update ()
{
}

