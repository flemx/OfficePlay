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
            console.log(startPoint);
            console.log(destination);
            console.log('pointers: ', pointer);
            console.log('player: ', this.player);
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
            console.log('Log path');
            for(let x of this.player.path){
                console.log(x);
            }
            
            //debugger;
            //this.player.path = path; 
             
            //debugger;
            //this.player.moving = true;
            //this.physics.moveTo(this.player, this.player.x + 40, this.player.y, 200);
            //let clone = Object.assign(Object.create(Object.getPrototypeOf(this.player)), this.player);
            //this.player.x = this.player.x + 32;
            //clone.x = clone.x + 50;
            //console.log(clone);
            //this.events.emit('monsterMovement', { x: this.player.x = this.player.x + 50, y :  this.player.y});
            //this.startW();
            //let demoTween = this.add.tween(this.player).to({x:this.player.x + 50,y:this.player.y},1000);
            //demoTween.start();
            //this.events.emit('monsterMovement', clone);
            //this.physics.moveToObject(this.player, clone, 40);
            // var tweens = [];
            // for(var i = 0; i < path.length-1; i++){
            //     var ex = this.map.coordinates[path[[i+1]]].x;
            //     var ey = this.map.coordinates[path[[i+1]]].y;
            //     console.log(`Add: x${ex}, y${ey}`);
            //     tweens.push({
            //         targets: this.player,
            //         x: {value: ex, duration: 200},
            //         y: {value: ey, duration: 200}
            //     });
            // }

            // this.tweens.timeline({
            //     tweens: tweens
            // });


            //debugger;
            //this.player.moveTo.moveTo(this.map.coordinates[path[[1]]].x,this.map.coordinates[path[[1]]].y);
            // debugger;
            // this.timer = 0;                  //  set your counter to 1
            // //this.startWalking(path);
  
            // var moveTo = this.plugins.get('rexmovetoplugin').add(this.player, {
            //     speed: 400,
            //     rotateToTarget: false
            // });
            // debugger;
            // var touchX = pointer.x;
            // var touchY = pointer.y;
            //this.player.moveTo.moveTo(touchX, touchY);
            
        });
    
    }

    async startW(){
        this.player.body.setVelocityX(100);
    }


    startWalking(path){
        setTimeout(()=> {   //  call a 3s setTimeout when the loop is called
            //debugger;
            this.player.moveTo(this.map.coordinates[path[[this.timer]]].x,this.map.coordinates[path[[this.timer]]].y);  //  your code here
            this.timer++;                    //  increment the counter
            if (this.time < path.length) {           //  if the counter < 10, call the loop function
              this.startWalking(path);             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
          }, 500)
        
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
