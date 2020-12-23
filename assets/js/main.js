

let phaserConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        BootScene,
        GameScene,
        TitleScene,
        UiScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y : 0
            }
        }
    },
    pixelArt: true,   // Fix blurry lines between tiles
    roundPixels: true,   // Fix blurry lines between tiles
};




const game = new Phaser.Game(phaserConfig);


function preload(){
    // Key name and image location
    this.load.image('button1','images/ui/blue_button01.png');
    // Load image as array of sprites devided by size
    this.load.spritesheet('items','images/items.png',{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('characters','images/characters.png',{frameWidth: 32, frameHeight: 32});
    //pick most appropriate audio format supported by browser
    this.load.audio('goldSound', ['audio/Pickup.wav']);
}



function create(){
    let goldPickupAudio = this.sound.add('goldSound',{loop: false});
    let button = this.add.image(100,100,'button1');
    // set the middle point of image
    button.setOrigin(0.5,0.5);
    // Use prite instead of image if you want to animate
    this.add.sprite(300,100,'button1');

    // Add spritesheet item
    this.chest = this.physics.add.image(300,300,'items',0);

    // add phyiscs as image and Make  into a wall and prevent collide by making immovable
    this.wall  = this.physics.add.image(500,100,'button1');
    this.wall.setImmovable();
    // Set player, scale larger and enable bounds
    //this.player = new Player(this,32,32,'characters',0);
    this.player = this.physics.add.image(32, 32, 'characters', 0);
    this.player.setScale(2);
    this.player.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.wall);

    // Add interaction to items
    this.physics.add.collider(this.player,this.wall)
    this.physics.add.overlap(this.player,this.chest, (player, chest)=> {
        goldPickupAudio.play()
        chest.destroy();
    });

    // Listen to key presses
    //this.cursors = this.input.keyboard.createCursorKeys();
    //this.cursors = this.input.keyboard.addKeys('W,S,A,D');
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update(){
    this.player.setVelocity(0);

    if(this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    }

    if(this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    }
}