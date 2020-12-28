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
        this.setSize(30, 40)
        this.setOffset(0, 24);

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
    }



    update(cursors){
        const speed = this.speed;
        const prevVelocity = this.body.velocity.clone();
      
        // Stop any previous movement from the last frame
        this.body.setVelocity(0);
      
        // Horizontal movement
        if (cursors.left.isDown) {
          this.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
          //this.body.setVelocityX(speed);
          this.scene.physics.moveTo(this, this.x + 10, this.y + 10, 200);
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

    moveTo(x,y){
        console.log(`Move player to: ${x} ${y}`);
        this.scene.physics.moveTo(this, x, y, 200);
    }
}