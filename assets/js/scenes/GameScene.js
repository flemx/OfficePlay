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
        //this.scene.launch('Ui');   // Not used for the moment
        this.score = 0;  // Not used for the moment
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
        // Spawn player at location 216,216
        this.player = new Player(this,216,216,"atlas", "misa-front");
    }


    createInput(){
        // On mouse press retrieve the shortest path to destination
        this.input.on('pointerdown', (pointer)=> {
            let destination  =  this.map.map.getTileAtWorldXY(pointer.worldX,pointer.worldY,'background');
            let startPoint = this.map.map.getTileAtWorldXY(this.player.x,this.player.y,'background');
            let desVertex = `x${destination.x}y${destination.y}`;
            if(this.map.illigals[desVertex]){
                console.log(`Coordinate ${desVertex} is an illigal destination!`);
            }else{
                // Call pathfinder algorithm 
                let dk = new PathFinder();
                let path = dk.findPath(`x${startPoint.x}y${startPoint.y}`,`x${destination.x}y${destination.y}`,this.map.graph);
                console.log('The shortest path is: ', path);
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
        // Spawn NPC with idle standing animation
      this.officeHelpNpc = new NPC(this, 285, 75, 'office-help');
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
        //this.physics.add.collider(this.player, this.map.blockedLayer);    // Disabled collision as with automatic mouse events no
    
      }

    


}
