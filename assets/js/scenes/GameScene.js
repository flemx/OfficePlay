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
        this.createPlayer();
        this.createNPC();
        this.createMap();  
        this.createAudio();
        this.createInput();
        this.addCollisions();
    }

    update(){
        this.player.update(this.cursors);
    }

    createAudio(){
        this.backgroundAudio = this.sound.add('background1',{loop: true});
        this.backgroundAudio.play();
    }


    createPlayer(){
        // Set player, scale larger and enable bounds
        //this.player = new Player(this,224,224,'characters',0);
        this.player = new Player(this,224,224,"atlas", "misa-front");
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

    createNPC(){
      this.officeHelpNpc = new NPC(this, 285, 75, 'office-help');
      //   //241,75
      //  let npc = this.add.sprite(241, 75, 'office-help');
      //  this.anims.create({
      //      key : "ideNpc",
      //      frameRate : 6,
      //      frames : this.anims.generateFrameNumbers('office-help', {start: 0,end: 5}),
      //      repeat : -1
      //  });
      //  npc.setScale(1.3);
      //  npc.play("ideNpc");
      //   mysprite.frame = 0;

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
            },
            {
                tilesetImage : 'furniture',
                layer : "above"
            },
            {
                tilesetImage : 'interiors',
                layer : "interiors1"
            }
        ]
        

        // create map
        this.map = new Map(this, 'map', mapCOnfig, this.player, this.officeHelpNpc);
      }

   

    addCollisions() {
        // check for collisions between player and the tiled blocked layer
        //this.physics.add.collider(this.player, this.map.blockedLayer);
    
      }

    


}
