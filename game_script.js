


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
var npcs;
var monsters;
var monsterY = 450;
var gameOver = false;
var frameCount = 0;
var npcBounce = -25;

function preload ()
{
    this.load.image('sky', 'Assets/Images/Sky.png');
    this.load.image('ground', 'Assets/Images/Platform.png');
    this.load.image('player', 'Assets/Images/PC.png');

    this.load.image('npc', 'Assets/Images/NPC.png');
    this.load.image('monster', 'Assets/Images/Monster.png');
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

    //  Some monsters to kill, 12 in total, evenly spaced 70 pixels apart along the x axis
    monsters = this.physics.add.group({
        key: 'monster',
        repeat: 11,
        setXY: { x: 12, y: monsterY }
    });

    monsters.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    npcs = this.physics.add.group();
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(monsters, platforms);
    this.physics.add.collider(npcs, platforms);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Setting camera bounds.
    this.cameras.main.setBounds(0, 0, xLimit, yLimit);

    //  Checks to see if the player overlaps with any of the monsters, if he does call the killMonster function
    this.physics.add.overlap(player, monsters, killMonster, null, this);

    this.physics.add.collider(player, npcs, hitNPC, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

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

    updateNPCs();
}





function killMonster (player, monster)
{
    monster.disableBody(true, true);

    //  Add and update the score
//    score += 10;
//    scoreText.setText('Score: ' + score);

    if (monsters.countActive(true) === 0)
    {
        monsters.children.iterate(function (child) {

            child.enableBody(true, child.x, monsterY, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var npc = npcs.create(x, 500, 'npc');
        npc.setBounce(0.01);
        npc.setCollideWorldBounds(true);
        npc.setVelocity(Phaser.Math.Between(-20, 20), npcBounce);
        npc.allowGravity = true;

    }
}

function hitNPC (player, npc)
{
    this.physics.pause();

    player.setTint(0xff0000);

//    player.anims.play('turn');

    gameOver = true;
}

function updateNPCs() {
    if (frameCount++ > 20) {
        npcs.children.iterate(function (child) {
            child.setVelocity(Phaser.Math.Between(-40, 40), npcBounce);
        });
        frameCount = 0;
    }
}
