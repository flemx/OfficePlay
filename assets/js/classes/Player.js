/**
 * Player
 * @ Damien Fleminks
 */


class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, key, frame){
        super(scene, x, y, key, frame);
         // Enable physics
         this.scene.physics.world.enable(this);
    
        this.scene = scene;
        this.speed = 250; // Velocity when moving our player
        this.setSize(32, 32)
        this.setOffset(0, 32);

        this.path = [];
        this.playerPos = {};

        // Keep track of next coord to move to
        this.moveToCoord;

        //Set animations
        let anims = this.scene.anims;
        anims.create({
            key: "player-left-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-right-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-front-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "player-back-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
    


       
        // Scale our player
        this.setScale(1.5);
        // Collide with our world bounds
        this.setCollideWorldBounds(true);
        // Add the player to our existing scene
        this.scene.add.existing(this)
        // have the camera follow the player
        this.scene.cameras.main.startFollow(this); 
        //Make sure player is visible by putting layer on top
        this.setDepth(5);


      this.moveTo = this.scene.plugins.get('rexmovetoplugin').add(this, {
          speed: 400,
          rotateToTarget: false
      }).on('complete', function(){
          console.log('Reach target');
      })


    }



    update(){

        const speed = this.speed;
        const prevVelocity = this.body.velocity.clone();
      
        // Stop any previous movement from the last frame
        this.body.setVelocity(0);


        let moveX = 0;
        let moveY = 0;
        //console.log('this.moveToCoord', this.moveToCoord);
        if(this.moveToCoord){
          //debugger;
          moveX = this.moveToCoord.x - this.x;
          moveY = this.moveToCoord.y - this.y;

          if(Math.abs(moveX) < 5){
            moveX = 0
          }
          if(Math.abs(moveY) < 5){
            moveY = 0
          }

          if(moveY === 0 && moveX === 0){
            if(this.path.length > 0){
               this.moveToCoord = this.path.shift()
              return
            }
            this.moveToCoord = undefined
          }

        }


        // if(this.path.length > 0){
        // // this.scene.physics.moveTo(this, this.path[1].x, this.path[1].y, 160);
        // //this.scene.physics.moveTo(this, 224, 224);
        // let playerTile = this.scene.map.map.getTileAtWorldXY(this.x,this.y,'background');
        // let nextTile = this.scene.map.map.getTileAtWorldXY(this.path[0].x,this.path[0].y,'background');
        // //debugger;
        //   if(playerTile.x === nextTile.x && playerTile.y === nextTile.y){
        //    debugger;
        //     console.log(playerTile.x === nextTile.x && playerTile.y === nextTile.y);
        //     this.path.shift();
        //     this.scene.physics.moveTo(this, this.path[0].x, this.path[0].y, 160);
        //   }
        //   debugger;
        // }


        let cursors = {
          left : {isDown : moveX < 0},
          right : {isDown : moveX > 0},
          up : {isDown : moveY < 0},
          down : {isDown : moveY > 0}
        }

        // Horizontal movement
        if (cursors.left.isDown) {
          this.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
          this.body.setVelocityX(speed);
          //this.scene.physics.moveTo(this, this.x + 10, this.y + 10, 200);
        }
      
        // Vertical movement
        if (cursors.up.isDown) {
          this.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
          this.body.setVelocityY(speed);
        }
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(speed);
        
        //debugger;
        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
          this.anims.play("player-left-walk", true);
        } else if (cursors.right.isDown) {
          this.anims.play("player-right-walk", true);
        } else if (cursors.up.isDown) {
          this.anims.play("player-back-walk", true);
        } else if (cursors.down.isDown) {
          this.anims.play("player-front-walk", true);
        } else {
          this.anims.stop();
        }

    }

    // moveTo(x,y){
    //     console.log(`Move player to: ${x} ${y}`);
    //     this.scene.physics.moveTo(this, x, y, 200);
    // }
}