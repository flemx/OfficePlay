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

    createMap() {
        // setup map configuration
        let mapCOnfig = [
            {
                tilesetImage : 'background',
                layer : "background"
            },
            {
                tilesetImage : 'furniture',
                layer : "furniture1"
            },
            {
                tilesetImage : 'furniture',
                layer : "furniture2"
            }
        ]
        

        // create map
        this.map = new Map(this, 'map', mapCOnfig);
      }

    addCollisions() {
        // check for collisions between player and the tiled blocked layer
        //this.physics.add.collider(this.player, this.map.blockedLayer);
    
      }

    


}