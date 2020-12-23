/**
 * Player
 * @ Damien Fleminks
 */


class Player extends Phaser.Physics.Arcade.Image{

    constructor(scene, x, y, key, frame){
        super(scene, x, y, key, frame);
        this.scene = scene;
        this.velocity = 160; // Velocity when moving our player

        // Enable physics
        this.scene.physics.world.enable(this);
        // Scale our player
        this.setScale(2);
        // Collide with our world bounds
        this.setCollideWorldBounds(true);
        // Add the player to our existing scene
        this.scene.add.existing(this)
        // have the camera follow the player
        this.scene.cameras.main.startFollow(this); 

    }



    update(cursors){
        // Move player based on keypresses
        this.body.setVelocity(0);
        if(cursors.left.isDown){
            this.body.setVelocityX(-this.velocity);
        }
        if (cursors.right.isDown){
            this.body.setVelocityX(this.velocity);
        }
        if(cursors.up.isDown){
            this.body.setVelocityY(-this.velocity);
        }
        if (cursors.down.isDown){
            this.body.setVelocityY(this.velocity);
        }
    }
}