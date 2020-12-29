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
        this.addCollisions();
        this.createInput();
        
    }

    update(){
        //this.player.update(this.cursors,this.walkTest);
        this.player.update();
    }

    createAudio(){
        this.backgroundAudio = this.sound.add('background1',{loop: true});
        this.backgroundAudio.play();
    }


    createPlayer(){
        // Set player, scale larger and enable bounds
        //this.player = new Player(this,224,224,'characters',0);
        this.player = new Player(this,216,216,"atlas", "misa-front");
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


        this.events.on('monsterMovement', (playerTo) => {
            this.player.playerTo = playerTo;
            this.walkTest = 'walk';
            //this.physics.moveToObject(this.player, playerTo, 40);
          });


          

        this.input.on('pointerdown', (pointer)=> {
            let destination  =  this.map.map.getTileAtWorldXY(pointer.worldX,pointer.worldY,'background');
            let startPoint = this.map.map.getTileAtWorldXY(this.player.x,this.player.y,'background');
            // console.log(startPoint);
            // console.log(destination);
            // console.log('pointers: ', pointer);
            // console.log('player: ', this.player);
            // console.log(this.map.illigals);
            let desVertex = `x${destination.x}y${destination.y}`;
            if(this.map.illigals[desVertex]){
                console.log('Illigal destination!');
                // console.log(desVertex);
                // console.log(this.map.illigals[desVertex]);
            }else{
                let dk = new Dijkstra(this.map.graph);
                let path = dk.findPath(`x${startPoint.x}y${startPoint.y}`,`x${destination.x}y${destination.y}`);
                this.player.path = [];
                for(let coord of path){
                    this.player.path.push(
                    {
                        x : this.map.coordinates[coord].x, 
                        y : this.map.coordinates[coord].y
                    })
                }
                this.player.moveToCoord = this.player.path[0];
            }
            

            
            
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
                layer : "above1"
            },
            {
                tilesetImage : 'furniture',
                layer : "above2"
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
