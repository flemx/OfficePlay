/**
 * GameScene
 * @ Damien Fleminks
 */


class GameScene extends Phaser.Scene {
    constructor(){
        super('Game');

    }

    init(){
        // Start Ui scene in parallel, placed on top
        this.scene.launch('Ui');
        this.score = 0;
    }

    create(){
        this.createMap();  // Load first
        this.createAudio();
        this.createPlayer();
        this.createChest();
        this.createInput();
        this.addCollisions();
       
    }

    update(){
        this.player.update(this.cursors);
    }

    createAudio(){
        this.goldPickupAudio = this.sound.add('goldSound',{loop: false});
    }


    createPlayer(){
        // Set player, scale larger and enable bounds
        this.player = new Player(this,224,224,'characters',0);
    }

    createChest(){
        // Create a chestgroup
        this.chests = this.physics.add.group();
        // Create chest positions array
        this.chestPositions = [[100,100],[200,200],[300,300],[400,400],[500,500]];
        // Specify the max number of chest we can have
        this.maxNumberOfChests = 3;
        for(let i = 0; i < this.maxNumberOfChests; i++){
           this.spawnChest();
        }

    }

    spawnChest(){
        // Add chest to group on random location from chestPositions
        const location = this.chestPositions[Math.floor(
            Math.random() * this.chestPositions.length
        )];

        let chest = this.chests.getFirstDead();
        console.log(chest);
        if(!chest){
            chest = new Chest(this,location[0],location[1],'items',0);
        } else{
            chest.setPosition(location[0],location[1]);
            chest.makeActive();
        }

        this.chests.add(chest);
    }

    collectChest(player, chest){
        //play gold pickup sound
        this.goldPickupAudio.play();
        // Update our score
        this.score += chest.coins;
        //update score in UI -> sending event that can be picked up from other Class
        this.events.emit('updateScore', this.score);
        //make chest object inactive
        chest.makeInactive();
        this.time.delayedCall(1000, this.spawnChest, [], this);
    }


    createInput(){
        // Listen to key presses
        //this.cursors = this.input.keyboard.createCursorKeys();
        //this.cursors = this.input.keyboard.addKeys('W,S,A,D');
        this.cursors = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    addCollisions() {
        // check for collisions between player and the tiled blocked layer
        this.physics.add.collider(this.player, this.blockedLayer);
        // check for overlaps between player and chest game objects
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
      }

    createMap() {
        // create the tile map
        this.map = this.make.tilemap({ key: 'map' });
        // add the tileset image to our map
        this.tiles = this.map.addTilesetImage('background', 'background', 32, 32, 1, 2);
        // create our background
        this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
        this.backgroundLayer.setScale(2);
        // create blocked layer
        this.blockedLayer = this.map.createStaticLayer('blocked', this.tiles, 0, 0);    // New c
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion([-1]);
        // update the world bounds
        this.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.physics.world.bounds.height = this.map.heightInPixels * 2;

        // limit the camera to the size of our map, remove black areas
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);
      }


}