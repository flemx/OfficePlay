/**
 * NPC
 * @ Damien Fleminks
 */


class NPC extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, key){
        super(scene, x, y, key);
         // Enable physics
         this.scene.physics.world.enable(this);
    
        this.scene = scene;
     

        //Set animations
        let anims = this.scene.anims;
        this.scene.anims.create({
            key : "ideNpc",
            frameRate : 6,
            frames : this.scene.anims.generateFrameNumbers('office-help', {start: 0,end: 5}),
            repeat : -1
        });

        // Scale our player
        this.setScale(1.3);
        // Collide with our world bounds
        this.setCollideWorldBounds(true);
        // Add the player to our existing scene
        this.scene.add.existing(this)
        //Make sure player is visible by putting layer on top
        this.setDepth(4);

        // Start animation
        this.play("ideNpc");
        this.body.immovable = true;
    }



    update(cursors){
       

    }
}